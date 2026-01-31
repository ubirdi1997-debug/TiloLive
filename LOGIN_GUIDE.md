# Login System - Simple Plain Text Authentication

## Overview
The login system has been completely rebuilt to use **plain text passwords** (no encryption) stored in `data/db.json` for easy debugging and testing.

## Credentials

**Username:** `admin`  
**Password:** `admin123`

These are stored in: `/workspaces/TiloLive/data/db.json`

## Files Modified

### 1. Database: `data/db.json`
```json
{
  "adminCredentials": {
    "username": "admin",
    "password": "admin123"
  }
}
```
- Changed from `passwordHash` to plain `password`
- No bcrypt, no encryption

### 2. Backend: `backend/server.py`
- Removed bcrypt password hashing
- Simple string comparison: `login.password == stored_password`
- Added detailed logging to see what's happening
- Returns descriptive error messages

### 3. Frontend: `frontend/src/pages/Admin.js`
- Added error message display on screen
- Shows backend URL being used
- Displays default credentials on login page
- Console logging for debugging
- Alert popup with full error details

## How to Test

### Option 1: Run the test script
```bash
python3 test_login.py
```

### Option 2: Start the backend manually
```bash
cd backend
python3 server.py
```

The server will start on `http://localhost:8000`

### Option 3: Test with curl
```bash
curl -X POST https://tilolive.in/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Expected response:
```json
{
  "success": true,
  "token": "admin-token-tilolive"
}
```

## Debugging

### Check Backend Logs
When you run `python3 server.py`, you'll see:
```
INFO: Login attempt - Username received: 'admin'
INFO: Admin credentials in DB: {'username': 'admin', 'password': 'admin123'}
INFO: Comparing: 'admin' == 'admin' and password match
INFO: Login successful!
```

### Check Frontend Console
Open browser DevTools (F12) and look for:
```
=== LOGIN ATTEMPT ===
API Endpoint: https://tilolive.in/api/admin/login
Username: admin
Password: admin123
Backend URL: https://tilolive.in
```

### Common Issues

1. **"Cannot connect" error**
   - Backend server is not running
   - Run: `python3 backend/server.py`

2. **"401 Invalid credentials" error**
   - Username/password mismatch
   - Check `data/db.json` has correct credentials
   - Check for typos or extra spaces

3. **"CORS error" in browser**
   - Backend CORS not configured
   - Check `backend/.env` has: `CORS_ORIGINS=*`

4. **"Module not found" error**
   - Missing dependencies
   - Run: `bash install_deps.sh` or `bash setup.sh`

## Production Deployment

For CloudLinux 8 server (tilolive.in):

1. Upload files to server
2. Install dependencies: `bash setup.sh`
3. Start backend: `python3 backend/server.py`
4. Configure reverse proxy to route `/api` → backend port 8000
5. Make sure `frontend/.env` has: `REACT_APP_BACKEND_URL=https://tilolive.in`

## Security Warning

⚠️ **This uses PLAIN TEXT passwords for debugging!**

For production, you should:
1. Re-enable bcrypt password hashing
2. Use HTTPS
3. Add rate limiting
4. Use environment variables for credentials
5. Enable proper authentication tokens

## Quick Start

```bash
# 1. Install dependencies
bash setup.sh

# 2. Start backend
cd backend
python3 server.py &

# 3. Test login
cd ..
python3 test_login.py

# 4. Start frontend
cd frontend
npm start
```

Then visit: `http://localhost:3000/admin`

Login with: `admin` / `admin123`
