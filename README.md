# Tilo Live - Modern Live Streaming Platform1

A professional rebranded website for Tilo Live (TiloLive.in) with a complete admin management system.

## 🌟 Features

### Public Pages
- **Home** - Hero section with glassmorphism design, features showcase, new host benefits, newsletter signup
- **Salary Structure** - Transparent host salary tiers (Bronze to Diamond) and agent commission structure
- **Rules & Guidelines** - Comprehensive accordion-based rules for hosts and agents
- **Contact** - Professional contact form with WhatsApp, email, and phone integration

### Admin Panel (`/admin`)
- **Dashboard** - Overview of messages, subscribers, and SMTP status
- **Settings Editor** - Update site title, hero content, colors, contact info, social media links
- **Messages Inbox** - View, mark as read, and delete contact form submissions (CRUD)
- **Newsletter Management** - View and manage newsletter subscribers
- **Email Composer** - Send emails via configured SMTP
- **SMTP Configuration** - Set up Hostinger email sending

### Additional Features
- WhatsApp floating button for quick contact
- Newsletter subscription system
- Social media integration (Facebook, Instagram, Twitter, YouTube)
- Mobile-first responsive design
- Modern UI with sky blue (#38bdf8) and cyan (#0ea5e9) theme

## 🔐 Admin Access

- **URL**: `/admin`
- **Password**: `admin123`

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: LowDB (JSON file-based storage at `/app/data/db.json`)
- **Email**: aiosmtplib for SMTP integration
- **API Authentication**: Bearer token authentication

### Frontend
- **Framework**: React 19
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: Sonner (toast notifications)

## 📂 Project Structure

```
/app
├── backend/
│   ├── server.py          # FastAPI application with all API routes
│   ├── .env              # Environment variables (ADMIN_PASSWORD)
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── pages/        # Home, Salary, Rules, Contact, Admin
│   │   ├── components/   # Navbar, Footer, UI components
│   │   ├── App.js        # Main app component
│   │   └── App.css       # Custom styles
│   ├── public/           # Static assets
│   └── package.json      # Node dependencies
└── data/
    └── db.json           # LowDB JSON database
```

## 🚀 API Endpoints

### Public Endpoints
- `GET /api/` - API health check
- `GET /api/settings` - Get public site settings
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

### Admin Endpoints (Requires Authentication)
- `POST /api/admin/login` - Admin login
- `GET/PUT /api/admin/settings` - Manage site settings
- `GET /api/admin/messages` - List contact messages
- `DELETE /api/admin/messages/{id}` - Delete message
- `PUT /api/admin/messages/{id}/read` - Mark message as read
- `GET /api/admin/newsletters` - List newsletter subscribers
- `DELETE /api/admin/newsletters/{id}` - Remove subscriber
- `GET/PUT /api/admin/smtp-settings` - SMTP configuration
- `POST /api/admin/compose` - Send email

## 📊 Database Schema

The `/app/data/db.json` file stores all data:

```json
{
  "settings": {
    "siteTitle": "Tilo Live",
    "heroHeadline": "...",
    "heroSubheadline": "...",
    "primaryColor": "#38bdf8",
    "secondaryColor": "#0ea5e9",
    "contactEmail": "info@tilolive.in",
    "contactPhone": "+91 82669 41716",
    "footerText": "© 2025 Tilo Live...",
    "whatsappNumber": "+918266941716",
    "socialMedia": { ... }
  },
  "messages": [ ... ],
  "newsletters": [ ... ],
  "smtpSettings": { ... }
}
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#38bdf8)
- **Secondary**: Cyan (#0ea5e9)
- **Gradient**: Linear gradient from sky blue to cyan

### Typography
- **Headings**: Manrope (sans-serif)
- **Body**: Inter (sans-serif)

### Components
- Glassmorphism effects with backdrop blur
- Rounded cards (rounded-2xl, rounded-xl)
- Hover animations and transitions
- Responsive grid layouts

## 📱 Responsive Design

- Mobile-first approach
- Collapsible navigation menu on mobile
- Adaptive layouts for tablets and desktop
- Touch-friendly buttons and forms

## 🔧 Configuration

### SMTP Settings (Hostinger)
Configure in Admin > SMTP tab:
- **Host**: smtp.hostinger.com
- **Port**: 587 (TLS) or 465 (SSL)
- **Username**: Your email address
- **Password**: Your email password
- **From Email**: noreply@tilolive.in
- **From Name**: Tilo Live

### Environment Variables
Located in `/app/backend/.env`:
```
ADMIN_PASSWORD=admin123
MONGO_URL=mongodb://localhost:27017
DB_NAME=test_database
CORS_ORIGINS=*
```

## ✅ Testing Results

- **Backend API**: 100% (11/11 endpoints working)
- **Frontend**: 100% (18/18 features working)
- **Admin Panel**: Fully functional with all CRUD operations
- **Mobile Responsive**: Tested and working
- **Form Submissions**: Saving correctly to database

## 🚦 Getting Started

The application is already running:
- **Frontend**: Port 3000
- **Backend**: Port 8001
- Services managed by Supervisor with hot reload enabled

## 📝 Content Source

Content professionally rewritten for Tilo Live based on structure from vikoofficial.com with:
- Corporate and professional tone
- Clear value propositions
- Transparent salary structures
- Comprehensive rules and guidelines
- Professional contact information

## 🎯 Key Differentiators

1. **JSON-based CMS** - No heavy database required, easy to backup
2. **Full Admin Control** - Edit all site content without code changes
3. **Email Integration** - Built-in SMTP for sending notifications
4. **Modern Design** - Glassmorphism, smooth animations, premium feel
5. **Mobile-First** - Optimized for all device sizes
6. **Professional Content** - Corporate tone matching live streaming industry standards

## 📄 License

© 2025 Tilo Live. All rights reserved.
