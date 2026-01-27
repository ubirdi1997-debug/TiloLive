# TiloLive - Modern Agency Platform

A professional agency platform built with Next.js, featuring responsive design, contact management, and an admin dashboard.

## Features

### Frontend
- **Modern Design**: Built with Next.js 16 and Tailwind CSS with a sky blue theme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Key Pages**:
  - **Home**: Professional landing page with feature highlights
  - **Salary**: Comprehensive salary structure displayed in responsive HTML tables (converted from image-based charts)
  - **Rules**: Detailed guidelines and company policies
  - **Contact**: Interactive contact form with validation

### Admin Dashboard
- **Private Admin Panel** at `/admin`
- **Contact Management**: View, update status, and delete contact form submissions
- **SMTP Configuration**: Manage email settings for responding to inquiries
- **Real-time Updates**: Refresh data to see new submissions
- **Status Tracking**: Mark submissions as New, Read, or Replied

### Technical Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom sky blue theme
- **Database**: LowDB for lightweight JSON-based data storage
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API endpoints for data management

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ubirdi1997-debug/TiloLive.git
cd TiloLive
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
TiloLive/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── admin/         # Admin API endpoints
│   │   └── contact/       # Contact form API
│   ├── contact/           # Contact page
│   ├── rules/             # Rules page
│   ├── salary/            # Salary page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   └── Navigation.tsx     # Navigation component
├── lib/                   # Utility functions
│   └── db.ts             # Database operations
└── data/                  # Database files (gitignored)
    └── db.json           # LowDB JSON database
```

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `GET /api/admin/contacts` - Get all contact submissions
- `PATCH /api/admin/contacts` - Update contact status
- `DELETE /api/admin/contacts` - Delete a contact
- `GET /api/admin/smtp` - Get SMTP settings
- `PUT /api/admin/smtp` - Update SMTP settings

## Features in Detail

### Responsive Salary Tables
The salary page converts image-based salary charts from the source website into responsive HTML tables with:
- Staff position salary ranges
- Bonus structures
- Benefits breakdown
- Performance incentives
- Additional benefits table
- Leave policies

### Admin Dashboard
Access the admin panel at `/admin` to:
1. **View Contact Submissions**: See all inquiries with timestamps and status
2. **Manage Submissions**: Update status (New/Read/Replied) or delete
3. **Configure SMTP**: Set up email server settings for automated responses
4. **Real-time Management**: Refresh to see new submissions instantly

### Contact Form
The contact form includes:
- Full validation
- Success/error messaging
- Database storage
- Clean, professional UI

## Database

The application uses LowDB, a lightweight JSON database perfect for small to medium applications. Data is stored in `data/db.json` with the following structure:

```json
{
  "contacts": [
    {
      "id": "timestamp",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Inquiry",
      "message": "Message text",
      "timestamp": "ISO date",
      "status": "new"
    }
  ],
  "smtpSettings": {
    "host": "smtp.gmail.com",
    "port": 587,
    "username": "",
    "password": "",
    "fromEmail": "noreply@tilolive.com",
    "fromName": "TiloLive"
  }
}
```

## Security Considerations

- Database file is gitignored to prevent sensitive data exposure
- SMTP credentials should be stored in environment variables in production
- Admin dashboard should be protected with authentication (recommended for production)
- Input validation on all forms
- XSS protection through React's built-in escaping

## License

This project is licensed under the ISC License.

---

Built with ❤️ using Next.js and Tailwind CSS