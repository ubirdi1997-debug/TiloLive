import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
}

export interface SMTPSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export interface DatabaseData {
  contacts: ContactSubmission[];
  smtpSettings: SMTPSettings;
}

const defaultData: DatabaseData = {
  contacts: [],
  smtpSettings: {
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    fromEmail: 'noreply@tilolive.com',
    fromName: 'TiloLive',
  },
};

let dbInstance: Low<DatabaseData> | null = null;

export async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }

  const dataDir = join(process.cwd(), 'data');
  
  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = join(dataDir, 'db.json');
  const adapter = new JSONFile<DatabaseData>(dbPath);
  dbInstance = new Low<DatabaseData>(adapter);
  await dbInstance.read();
  
  // Initialize with default data if empty
  if (!dbInstance.data) {
    dbInstance.data = defaultData;
    await dbInstance.write();
  }
  
  return dbInstance;
}

export async function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'timestamp' | 'status'>) {
  const db = await getDb();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    status: 'new',
  };
  
  if (db.data) {
    db.data.contacts.push(newSubmission);
    await db.write();
  }
  
  return newSubmission;
}

export async function getAllContacts() {
  const db = await getDb();
  return db.data?.contacts || [];
}

export async function updateContactStatus(id: string, status: ContactSubmission['status']) {
  const db = await getDb();
  if (!db.data) return null;
  
  const contact = db.data.contacts.find((c) => c.id === id);
  
  if (contact) {
    contact.status = status;
    await db.write();
    return contact;
  }
  
  return null;
}

export async function deleteContact(id: string) {
  const db = await getDb();
  if (!db.data) return false;
  
  const index = db.data.contacts.findIndex((c) => c.id === id);
  
  if (index !== -1) {
    db.data.contacts.splice(index, 1);
    await db.write();
    return true;
  }
  
  return false;
}

export async function getSMTPSettings() {
  const db = await getDb();
  return db.data?.smtpSettings || defaultData.smtpSettings;
}

export async function updateSMTPSettings(settings: Partial<SMTPSettings>) {
  const db = await getDb();
  if (!db.data) return defaultData.smtpSettings;
  
  db.data.smtpSettings = { ...db.data.smtpSettings, ...settings };
  await db.write();
  return db.data.smtpSettings;
}
