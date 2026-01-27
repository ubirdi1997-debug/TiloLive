import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Require explicit password configuration for security
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminPassword) {
    return new NextResponse('Admin panel not configured. Set ADMIN_PASSWORD environment variable.', {
      status: 503,
    });
  }
  
  const authHeader = request.headers.get('authorization');

  // Check for basic auth
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    });
  }

  // Decode and validate credentials
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username !== 'admin' || password !== adminPassword) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Area"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
