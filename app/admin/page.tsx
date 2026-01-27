'use client';

import { useState, useEffect } from 'react';

// TODO: Add authentication before production deployment
// This admin dashboard should be protected with proper authentication
// to prevent unauthorized access to sensitive contact data and SMTP settings

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'new' | 'read' | 'replied';
}

interface SMTPSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'smtp'>('contacts');
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [smtpSettings, setSMTPSettings] = useState<SMTPSettings>({
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    fromEmail: 'noreply@tilolive.com',
    fromName: 'TiloLive',
  });
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  useEffect(() => {
    fetchContacts();
    fetchSMTPSettings();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSMTPSettings = async () => {
    try {
      const response = await fetch('/api/admin/smtp');
      if (response.ok) {
        const data = await response.json();
        setSMTPSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching SMTP settings:', error);
    }
  };

  const updateContactStatus = async (id: string, status: ContactSubmission['status']) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      
      if (response.ok) {
        setContacts(contacts.map(c => c.id === id ? { ...c, status } : c));
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const saveSMTPSettings = async () => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/admin/smtp', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpSettings),
      });
      
      if (response.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Error saving SMTP settings:', error);
      setSaveStatus('error');
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-primary-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">TiloLive Admin Dashboard</h1>
            <a href="/" className="bg-white text-primary-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
              ← Back to Site
            </a>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'contacts'
                  ? 'border-primary-600 text-primary-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Contact Submissions ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('smtp')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === 'smtp'
                  ? 'border-primary-600 text-primary-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              SMTP Settings
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'contacts' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
              <button
                onClick={fetchContacts}
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
              >
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading...</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No contact submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              contact.status === 'new'
                                ? 'bg-green-100 text-green-800'
                                : contact.status === 'read'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {contact.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          <strong>Email:</strong> {contact.email}
                        </p>
                        <p className="text-gray-600">
                          <strong>Subject:</strong> {contact.subject}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {formatDate(contact.timestamp)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={contact.status}
                          onChange={(e) => updateContactStatus(contact.id, e.target.value as ContactSubmission['status'])}
                          className="border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'smtp' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">SMTP Configuration</h2>
            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={smtpSettings.host}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, host: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={smtpSettings.port}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="587"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={smtpSettings.username}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, username: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="your-email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={smtpSettings.password}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Email
                  </label>
                  <input
                    type="email"
                    value={smtpSettings.fromEmail}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, fromEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="noreply@tilolive.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From Name
                  </label>
                  <input
                    type="text"
                    value={smtpSettings.fromName}
                    onChange={(e) => setSMTPSettings({ ...smtpSettings, fromName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                    placeholder="TiloLive"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={saveSMTPSettings}
                    disabled={saveStatus === 'saving'}
                    className="w-full bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold disabled:bg-gray-400"
                  >
                    {saveStatus === 'saving' ? 'Saving...' : 'Save Settings'}
                  </button>
                  
                  {saveStatus === 'success' && (
                    <p className="mt-3 text-green-600 text-center">Settings saved successfully!</p>
                  )}
                  {saveStatus === 'error' && (
                    <p className="mt-3 text-red-600 text-center">Failed to save settings.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
              <p className="text-yellow-800">
                <strong>Note:</strong> These settings are stored in the local database. For security,
                consider using environment variables for sensitive credentials in production.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
