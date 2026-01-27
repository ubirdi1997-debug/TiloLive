import { NextRequest, NextResponse } from 'next/server';
import { getSMTPSettings, updateSMTPSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getSMTPSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching SMTP settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch SMTP settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { host, port, username, password, fromEmail, fromName } = body;

    if (!host || !port || !fromEmail || !fromName) {
      return NextResponse.json(
        { error: 'Host, port, fromEmail, and fromName are required' },
        { status: 400 }
      );
    }

    const updatedSettings = await updateSMTPSettings({
      host,
      port,
      username,
      password,
      fromEmail,
      fromName,
    });

    return NextResponse.json({ settings: updatedSettings });
  } catch (error) {
    console.error('Error updating SMTP settings:', error);
    return NextResponse.json(
      { error: 'Failed to update SMTP settings' },
      { status: 500 }
    );
  }
}
