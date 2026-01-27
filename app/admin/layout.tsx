import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans antialiased">
        <div className="min-h-screen flex">
          {/* Sidebar */}
          <aside className="w-64 bg-gray-900 text-white">
            <div className="p-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
                TiloLive Admin
              </h1>
            </div>
            <nav className="mt-6">
              <Link
                href="/admin/inbox"
                className="block px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                📬 Inbox
              </Link>
              <Link
                href="/admin/settings"
                className="block px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                ⚙️ Settings
              </Link>
              <Link
                href="/"
                className="block px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              >
                🏠 Back to Site
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
