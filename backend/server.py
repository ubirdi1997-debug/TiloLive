from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any, List
import json
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import uuid
import bcrypt
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

DB_FILE = Path('/app/data/db.json')
UPLOADS_DIR = Path('/app/frontend/public/uploads')
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

security = HTTPBearer()

app = FastAPI()
api_router = APIRouter(prefix="/api")

def read_db():
    with open(DB_FILE, 'r') as f:
        return json.load(f)

def write_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

class AdminLogin(BaseModel):
    password: str

class AdminLoginResponse(BaseModel):
    success: bool
    token: str

class PasswordChange(BaseModel):
    oldPassword: str
    newPassword: str

class SiteSettings(BaseModel):
    siteTitle: str
    heroHeadline: str
    heroSubheadline: str
    primaryColor: str
    secondaryColor: str
    contactEmail: EmailStr
    contactPhone: str
    companyName: str
    whatsappNumber: str
    socialMedia: Dict[str, str]
    headerLogo: Optional[str] = None
    footerLogo: Optional[str] = None

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class SMTPSettings(BaseModel):
    host: str
    port: int
    username: str
    password: str
    from_email: EmailStr
    from_name: str

class ComposeEmail(BaseModel):
    to: str
    subject: str
    body: str

def verify_admin_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials.credentials != "admin-token-tilolive":
        raise HTTPException(status_code=401, detail="Invalid authentication")
    return credentials.credentials

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(login: AdminLogin):
    db = read_db()
    stored_hash = db.get('adminPasswordHash')
    
    if not stored_hash:
        # First time - create hash from env password
        admin_password = os.environ.get('ADMIN_PASSWORD', 'admin123')
        stored_hash = hash_password(admin_password)
        db['adminPasswordHash'] = stored_hash
        write_db(db)
    
    if verify_password(login.password, stored_hash):
        return AdminLoginResponse(success=True, token="admin-token-tilolive")
    raise HTTPException(status_code=401, detail="Invalid password")

@api_router.post("/admin/change-password")
async def change_password(data: PasswordChange, token: str = Depends(verify_admin_token)):
    db = read_db()
    stored_hash = db.get('adminPasswordHash')
    
    if not stored_hash:
        raise HTTPException(status_code=400, detail="Password not initialized")
    
    # Verify old password
    if not verify_password(data.oldPassword, stored_hash):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Hash and save new password
    new_hash = hash_password(data.newPassword)
    db['adminPasswordHash'] = new_hash
    write_db(db)
    
    return {"success": True, "message": "Password changed successfully"}

@api_router.post("/admin/upload-logo")
async def upload_logo(file: UploadFile = File(...), logoType: str = 'header', token: str = Depends(verify_admin_token)):
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="Only image files are allowed")
        
        # Generate unique filename
        file_ext = file.filename.split('.')[-1]
        unique_filename = f"{logoType}_logo_{uuid.uuid4().hex[:8]}.{file_ext}"
        file_path = UPLOADS_DIR / unique_filename
        
        # Save file
        with open(file_path, 'wb') as f:
            shutil.copyfileobj(file.file, f)
        
        # Update database
        db = read_db()
        if 'settings' not in db:
            db['settings'] = {}
        
        logo_url = f"/uploads/{unique_filename}"
        if logoType == 'header':
            db['settings']['headerLogo'] = logo_url
        else:
            db['settings']['footerLogo'] = logo_url
        
        write_db(db)
        
        return {"success": True, "logoUrl": logo_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/admin/settings")
async def get_settings(token: str = Depends(verify_admin_token)):
    db = read_db()
    return db.get('settings', {})

@api_router.put("/admin/settings")
async def update_settings(settings: SiteSettings, token: str = Depends(verify_admin_token)):
    db = read_db()
    db['settings'] = settings.model_dump()
    write_db(db)
    return {"success": True, "settings": db['settings']}

@api_router.get("/settings")
async def get_public_settings():
    db = read_db()
    settings = db.get('settings', {})
    return {
        "siteTitle": settings.get('siteTitle'),
        "heroHeadline": settings.get('heroHeadline'),
        "heroSubheadline": settings.get('heroSubheadline'),
        "primaryColor": settings.get('primaryColor'),
        "secondaryColor": settings.get('secondaryColor'),
        "contactEmail": settings.get('contactEmail'),
        "contactPhone": settings.get('contactPhone'),
        "companyName": settings.get('companyName', 'Tilo Live'),
        "whatsappNumber": settings.get('whatsappNumber'),
        "socialMedia": settings.get('socialMedia', {}),
        "headerLogo": settings.get('headerLogo'),
        "footerLogo": settings.get('footerLogo')
    }

@api_router.post("/contact")
async def submit_contact(contact: ContactMessage):
    db = read_db()
    message_data = contact.model_dump()
    message_data['id'] = str(uuid.uuid4())
    message_data['timestamp'] = datetime.utcnow().isoformat()
    message_data['read'] = False
    
    if 'messages' not in db:
        db['messages'] = []
    db['messages'].append(message_data)
    write_db(db)
    return {"success": True, "message": "Message received successfully"}

@api_router.get("/admin/messages")
async def get_messages(token: str = Depends(verify_admin_token)):
    db = read_db()
    return db.get('messages', [])

@api_router.delete("/admin/messages/{message_id}")
async def delete_message(message_id: str, token: str = Depends(verify_admin_token)):
    db = read_db()
    messages = db.get('messages', [])
    db['messages'] = [m for m in messages if m.get('id') != message_id]
    write_db(db)
    return {"success": True}

@api_router.put("/admin/messages/{message_id}/read")
async def mark_message_read(message_id: str, token: str = Depends(verify_admin_token)):
    db = read_db()
    messages = db.get('messages', [])
    for msg in messages:
        if msg.get('id') == message_id:
            msg['read'] = True
    write_db(db)
    return {"success": True}

@api_router.post("/newsletter")
async def subscribe_newsletter(subscribe: NewsletterSubscribe):
    db = read_db()
    if 'newsletters' not in db:
        db['newsletters'] = []
    
    existing = [n for n in db['newsletters'] if n.get('email') == subscribe.email]
    if existing:
        return {"success": True, "message": "Already subscribed"}
    
    newsletter_data = {
        "id": str(uuid.uuid4()),
        "email": subscribe.email,
        "timestamp": datetime.utcnow().isoformat()
    }
    db['newsletters'].append(newsletter_data)
    write_db(db)
    return {"success": True, "message": "Subscribed successfully"}

@api_router.get("/admin/newsletters")
async def get_newsletters(token: str = Depends(verify_admin_token)):
    db = read_db()
    return db.get('newsletters', [])

@api_router.delete("/admin/newsletters/{newsletter_id}")
async def delete_newsletter(newsletter_id: str, token: str = Depends(verify_admin_token)):
    db = read_db()
    newsletters = db.get('newsletters', [])
    db['newsletters'] = [n for n in newsletters if n.get('id') != newsletter_id]
    write_db(db)
    return {"success": True}

@api_router.get("/admin/smtp-settings")
async def get_smtp_settings(token: str = Depends(verify_admin_token)):
    db = read_db()
    return db.get('smtpSettings', {})

@api_router.put("/admin/smtp-settings")
async def update_smtp_settings(settings: SMTPSettings, token: str = Depends(verify_admin_token)):
    db = read_db()
    db['smtpSettings'] = settings.model_dump()
    write_db(db)
    return {"success": True}

@api_router.post("/admin/compose")
async def compose_email(email: ComposeEmail, token: str = Depends(verify_admin_token)):
    db = read_db()
    smtp_settings = db.get('smtpSettings')
    
    if not smtp_settings:
        raise HTTPException(status_code=400, detail="SMTP settings not configured")
    
    try:
        message = MIMEMultipart()
        message['From'] = f"{smtp_settings['from_name']} <{smtp_settings['from_email']}>"
        message['To'] = email.to
        message['Subject'] = email.subject
        
        message.attach(MIMEText(email.body, 'html'))
        
        await aiosmtplib.send(
            message,
            hostname=smtp_settings['host'],
            port=smtp_settings['port'],
            username=smtp_settings['username'],
            password=smtp_settings['password'],
            use_tls=True
        )
        
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

@api_router.get("/")
async def root():
    return {"message": "Tilo Live API"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)