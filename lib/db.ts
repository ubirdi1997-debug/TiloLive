import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  role: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

interface Settings {
  siteName: string;
  adminPassword: string;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
  };
}

interface Database {
  settings: Settings;
  messages: Message[];
}

let db: Low<Database> | null = null;

export async function getDb() {
  if (!db) {
    const file = path.join(process.cwd(), 'data', 'db.json');
    const adapter = new JSONFile<Database>(file);
    db = new Low(adapter, {
      settings: {
        siteName: 'Tilo Live',
        adminPassword: process.env.ADMIN_PASSWORD || 'CHANGE_ME_' + Math.random().toString(36).substring(7),
        smtp: {
          host: '',
          port: 587,
          secure: false,
          user: '',
          pass: ''
        }
      },
      messages: []
    });
    await db.read();
  }
  return db;
}

export type { Message, Settings, Database };
