import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, message } = body;

    // Validate required fields
    if (!name || !email || !message || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get database instance
    const db = await getDb();

    // Create new message
    const newMessage = {
      id: randomUUID(),
      name,
      email,
      phone: phone || '',
      role,
      message,
      status: 'unread' as const,
      createdAt: new Date().toISOString(),
    };

    // Add to database
    db.data.messages.push(newMessage);
    await db.write();

    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
