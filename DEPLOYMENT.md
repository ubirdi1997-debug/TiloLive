# TiloLive Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/ubirdi1997-debug/TiloLive.git
cd TiloLive
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and set a strong admin password:
```
ADMIN_PASSWORD=your-secure-password-here
```

### 3. Initialize Content

Run the content scripts to populate your site:

```bash
# Fetch content from source (optional - default content included)
npm run fetch-content

# Rebrand the content (optional - default content included)
npm run rebrand-content
```

### 4. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 5. Access Admin Panel

Navigate to: http://localhost:3000/admin

**Credentials:**
- Username: `admin`
- Password: [Your ADMIN_PASSWORD from .env]

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `ADMIN_PASSWORD`
4. Deploy

### Deploy to Other Platforms

**Netlify:**
```bash
npm run build
# Deploy .next folder
```

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Configuration

### Admin Settings

Edit `data/db.json` to configure:
- Site name
- SMTP settings for email notifications

### Content Updates

Edit `data/content.json` to modify:
- Homepage hero text and features
- Salary tiers and descriptions
- Rules and guidelines
- Contact page information

### Theme Customization

Edit `tailwind.config.ts` to change:
- Primary colors (currently Sky Blue)
- Typography
- Spacing

## Maintenance

### Backup Database

```bash
cp data/db.json data/db.backup.json
```

### Clear Messages

Edit `data/db.json` and set `messages: []`

### Update Content

Re-run the rebranding script:
```bash
npm run fetch-content
npm run rebrand-content
```

## Troubleshooting

### Admin Panel Not Working

- Ensure `ADMIN_PASSWORD` is set in environment
- Check browser supports Basic Authentication
- Clear browser cache

### Build Failures

- Delete `.next` folder and rebuild
- Clear `node_modules` and reinstall

### Contact Form Not Working

- Check `data/db.json` exists and is writable
- Verify API route is accessible at `/api/contact`

## Security Checklist

- [ ] Set strong `ADMIN_PASSWORD`
- [ ] Don't commit `.env` file
- [ ] Regularly backup `data/db.json`
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated

## Support

For issues or questions:
- Check README.md
- Review code comments
- Contact: support@tilolive.in
