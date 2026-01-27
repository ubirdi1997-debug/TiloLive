# TiloLive - Premium Live Streaming Agency

A modern, full-stack website for a live streaming agency built with Next.js 14, featuring a public frontend and private admin panel.

## 🚀 Features

### Public Frontend
- **Modern Design**: Sky Blue gradient theme with glassmorphism effects
- **Responsive**: Mobile-first design that works on all devices
- **Pages**:
  - Home: Hero section with features and call-to-action
  - Salary: Interactive pricing table with diamond calculator
  - Rules: Accordion-style guidelines
  - Contact: Form with validation and submission

### Admin Panel
- **Secure Access**: Basic authentication middleware
- **Inbox Management**: View, filter, and delete contact submissions
- **Settings**: Configure SMTP and site settings
- **Dashboard**: Real-time statistics and message tracking

### Content Management
- **Automated Scraping**: Scripts to fetch content from source site
- **Rebranding**: Automated content transformation and modernization
- **JSON Database**: LowDB for lightweight data storage

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 3
- **Database**: LowDB (JSON-based)
- **Language**: TypeScript
- **Email**: Nodemailer (configured)
- **Scraping**: Axios + Cheerio

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ubirdi1997-debug/TiloLive.git
   cd TiloLive
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and set your ADMIN_PASSWORD
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run fetch-content` - Scrape content from source site
- `npm run rebrand-content` - Transform scraped content

## 🔧 Content Management Workflow

1. **Fetch content from source site**:
   ```bash
   npm run fetch-content
   ```
   This scrapes content from vikoofficial.com and saves to `data/rawContent.json`

2. **Rebrand the content**:
   ```bash
   npm run rebrand-content
   ```
   This transforms the raw content for TiloLive branding and saves to `data/content.json`

3. **The website automatically uses** `data/content.json` for all page content

## 🔐 Admin Panel

Access the admin panel at `/admin` with:
- **Username**: `admin`
- **Password**: Set via `ADMIN_PASSWORD` environment variable (default: `admin123`)

### Admin Features:
- **Inbox** (`/admin/inbox`): View and manage contact form submissions
- **Settings** (`/admin/settings`): View site and SMTP configuration

## 🗂️ Project Structure

```
TiloLive/
├── app/
│   ├── admin/           # Admin panel pages
│   ├── api/             # API routes
│   ├── contact/         # Contact page
│   ├── rules/           # Rules page
│   ├── salary/          # Salary page
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── admin/           # Admin components
│   ├── Footer.tsx       # Footer component
│   └── Navbar.tsx       # Navigation component
├── data/
│   ├── content.json     # Rebranded site content
│   ├── db.json          # Database (messages, settings)
│   └── rawContent.json  # Scraped raw content
├── lib/
│   └── db.ts            # Database utilities
├── scripts/
│   ├── fetchSiteContent.js    # Content scraper
│   └── rebrandContent.js      # Content transformer
└── middleware.ts        # Admin auth middleware
```

## 🎨 Theme

The site uses a Sky Blue and Cyan color scheme:
- Primary: Sky Blue (#0ea5e9)
- Secondary: Cyan (#06b6d4)
- Accent: White (#ffffff)

## 📊 Database Schema

### Messages (Contact Form Submissions)
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "role": "host|agent|other",
  "message": "string",
  "status": "unread|read|replied",
  "createdAt": "ISO date string"
}
```

### Settings
```json
{
  "siteName": "Tilo Live",
  "adminPassword": "admin123",
  "smtp": {
    "host": "smtp.hostinger.com",
    "port": 587,
    "secure": false,
    "user": "your-email@tilolive.in",
    "pass": "your-password"
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
1. Build the project: `npm run build`
2. Set environment variables (ADMIN_PASSWORD)
3. Start the server: `npm start`

## 🔒 Security

- Admin panel protected with Basic Authentication
- Password configurable via environment variables
- SMTP credentials stored securely in database
- Input validation on all forms

## 📄 License

ISC

## 👥 Author

Built for TiloLive - Premium Live Streaming Agency

## 🙏 Acknowledgments

- Template inspiration: play-nextjs and nextjs-admin-dashboard
- Original branding: vikoofficial.com (content structure only)
