import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import axios from 'axios';
import { Trash2, Mail, Settings, Inbox, BarChart3, Edit, Check } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    siteTitle: '',
    heroHeadline: '',
    heroSubheadline: '',
    primaryColor: '',
    secondaryColor: '',
    contactEmail: '',
    contactPhone: '',
    footerText: '',
    whatsappNumber: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: ''
    }
  });

  // Messages State
  const [messages, setMessages] = useState([]);
  
  // Newsletters State
  const [newsletters, setNewsletters] = useState([]);

  // SMTP State
  const [smtpSettings, setSmtpSettings] = useState({
    host: '',
    port: 587,
    username: '',
    password: '',
    from_email: '',
    from_name: ''
  });

  // Compose State
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        setToken(response.data.token);
        setIsLoggedIn(true);
        toast.success('Login successful!');
        fetchAdminData(response.data.token);
      }
    } catch (error) {
      toast.error('Invalid password');
    } finally {
      setLoading(false);
    }
  };

  const fetchAdminData = async (authToken) => {
    const config = {
      headers: { Authorization: `Bearer ${authToken}` }
    };

    try {
      const [settingsRes, messagesRes, newslettersRes, smtpRes] = await Promise.all([
        axios.get(`${API}/admin/settings`, config),
        axios.get(`${API}/admin/messages`, config),
        axios.get(`${API}/admin/newsletters`, config),
        axios.get(`${API}/admin/smtp-settings`, config),
      ]);

      setSettings(settingsRes.data);
      setMessages(messagesRes.data);
      setNewsletters(newslettersRes.data);
      setSmtpSettings(smtpRes.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Settings saved successfully!');
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`${API}/admin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Message deleted');
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await axios.put(`${API}/admin/messages/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const handleDeleteNewsletter = async (id) => {
    try {
      await axios.delete(`${API}/admin/newsletters/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewsletters(newsletters.filter(n => n.id !== id));
      toast.success('Subscriber removed');
    } catch (error) {
      toast.error('Failed to remove subscriber');
    }
  };

  const handleSaveSMTP = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/admin/smtp-settings`, smtpSettings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('SMTP settings saved!');
    } catch (error) {
      toast.error('Failed to save SMTP settings');
    } finally {
      setLoading(false);
    }
  };

  const handleCompose = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/admin/compose`, composeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Email sent successfully!');
      setComposeData({ to: '', subject: '', body: '' });
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to send email');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center px-4" data-testid="admin-login-page">
        <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter your password to access the admin panel</p>
          </div>
          <form onSubmit={handleLogin} data-testid="admin-login-form">
            <div className="mb-6">
              <Label htmlFor="password" className="text-gray-700 font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                placeholder="Enter admin password"
                required
                data-testid="admin-password-input"
              />
            </div>
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600" disabled={loading} data-testid="admin-login-button">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-dashboard">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Tilo Live Admin Panel</h1>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)} data-testid="admin-logout-button">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
            <TabsTrigger value="dashboard" data-testid="tab-dashboard">
              <BarChart3 className="mr-2" size={16} /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="settings" data-testid="tab-settings">
              <Settings className="mr-2" size={16} /> Settings
            </TabsTrigger>
            <TabsTrigger value="messages" data-testid="tab-messages">
              <Inbox className="mr-2" size={16} /> Messages ({messages.filter(m => !m.read).length})
            </TabsTrigger>
            <TabsTrigger value="newsletters" data-testid="tab-newsletters">
              <Mail className="mr-2" size={16} /> Newsletters
            </TabsTrigger>
            <TabsTrigger value="compose" data-testid="tab-compose">
              <Edit className="mr-2" size={16} /> Compose
            </TabsTrigger>
            <TabsTrigger value="smtp" data-testid="tab-smtp">
              <Settings className="mr-2" size={16} /> SMTP
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" data-testid="dashboard-content">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Messages</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-sky-500">{messages.length}</p>
                  <p className="text-sm text-gray-600 mt-2">{messages.filter(m => !m.read).length} unread</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Subscribers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-cyan-500">{newsletters.length}</p>
                  <p className="text-sm text-gray-600 mt-2">Total subscribers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SMTP Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-500">
                    {smtpSettings.host ? 'Configured' : 'Not Set'}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Email service</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" data-testid="settings-content">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Update your website content and appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    id="siteTitle"
                    value={settings.siteTitle}
                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    data-testid="settings-site-title"
                  />
                </div>

                <div>
                  <Label htmlFor="heroHeadline">Hero Headline</Label>
                  <Input
                    id="heroHeadline"
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    data-testid="settings-hero-headline"
                  />
                </div>

                <div>
                  <Label htmlFor="heroSubheadline">Hero Subheadline</Label>
                  <Textarea
                    id="heroSubheadline"
                    value={settings.heroSubheadline}
                    onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
                    rows={3}
                    data-testid="settings-hero-subheadline"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                      data-testid="settings-primary-color"
                    />
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                      data-testid="settings-secondary-color"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      data-testid="settings-contact-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      data-testid="settings-contact-phone"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    data-testid="settings-whatsapp-number"
                  />
                </div>

                <div>
                  <Label>Social Media Links</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <Input
                      placeholder="Facebook URL"
                      value={settings.socialMedia?.facebook || ''}
                      onChange={(e) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, facebook: e.target.value }})}
                      data-testid="settings-social-facebook"
                    />
                    <Input
                      placeholder="Instagram URL"
                      value={settings.socialMedia?.instagram || ''}
                      onChange={(e) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, instagram: e.target.value }})}
                      data-testid="settings-social-instagram"
                    />
                    <Input
                      placeholder="Twitter URL"
                      value={settings.socialMedia?.twitter || ''}
                      onChange={(e) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, twitter: e.target.value }})}
                      data-testid="settings-social-twitter"
                    />
                    <Input
                      placeholder="YouTube URL"
                      value={settings.socialMedia?.youtube || ''}
                      onChange={(e) => setSettings({ ...settings, socialMedia: { ...settings.socialMedia, youtube: e.target.value }})}
                      data-testid="settings-social-youtube"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="footerText">Footer Text</Label>
                  <Input
                    id="footerText"
                    value={settings.footerText}
                    onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                    data-testid="settings-footer-text"
                  />
                </div>

                <Button onClick={handleSaveSettings} disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600" data-testid="save-settings-button">
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" data-testid="messages-content">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>View and manage contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`border rounded-xl p-4 ${msg.read ? 'bg-gray-50' : 'bg-sky-50 border-sky-200'}`}
                        data-testid={`message-item-${msg.id}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                            <p className="text-sm text-gray-600">{msg.email} {msg.phone && `• ${msg.phone}`}</p>
                          </div>
                          <div className="flex gap-2">
                            {!msg.read && (
                              <Button size="sm" variant="outline" onClick={() => handleMarkRead(msg.id)} data-testid={`mark-read-${msg.id}`}>
                                <Check className="mr-1" size={16} /> Mark Read
                              </Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteMessage(msg.id)} data-testid={`delete-message-${msg.id}`}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm font-semibold text-gray-700">Subject:</span>
                          <span className="text-sm text-gray-900 ml-2">{msg.subject}</span>
                        </div>
                        <p className="text-sm text-gray-700 bg-white p-3 rounded-lg">{msg.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date(msg.timestamp).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Newsletters Tab */}
          <TabsContent value="newsletters" data-testid="newsletters-content">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Subscribers</CardTitle>
                <CardDescription>Manage your newsletter subscription list</CardDescription>
              </CardHeader>
              <CardContent>
                {newsletters.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No subscribers yet</p>
                ) : (
                  <div className="space-y-3">
                    {newsletters.map((sub) => (
                      <div key={sub.id} className="flex justify-between items-center border rounded-xl p-4 bg-white" data-testid={`newsletter-item-${sub.id}`}>
                        <div>
                          <p className="font-semibold text-gray-900">{sub.email}</p>
                          <p className="text-xs text-gray-500">{new Date(sub.timestamp).toLocaleString()}</p>
                        </div>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteNewsletter(sub.id)} data-testid={`delete-newsletter-${sub.id}`}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compose Tab */}
          <TabsContent value="compose" data-testid="compose-content">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Send emails to users or subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCompose} className="space-y-6" data-testid="compose-form">
                  <div>
                    <Label htmlFor="to">To</Label>
                    <Input
                      id="to"
                      type="email"
                      value={composeData.to}
                      onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                      placeholder="recipient@example.com"
                      required
                      data-testid="compose-to-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={composeData.subject}
                      onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                      placeholder="Email subject"
                      required
                      data-testid="compose-subject-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="body">Message Body (HTML supported)</Label>
                    <Textarea
                      id="body"
                      value={composeData.body}
                      onChange={(e) => setComposeData({ ...composeData, body: e.target.value })}
                      rows={10}
                      placeholder="Enter your message here..."
                      required
                      data-testid="compose-body-input"
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600" data-testid="send-email-button">
                    {loading ? 'Sending...' : 'Send Email'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SMTP Tab */}
          <TabsContent value="smtp" data-testid="smtp-content">
            <Card>
              <CardHeader>
                <CardTitle>SMTP Configuration</CardTitle>
                <CardDescription>Configure Hostinger SMTP settings for sending emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="host">SMTP Host</Label>
                    <Input
                      id="host"
                      value={smtpSettings.host}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                      placeholder="smtp.hostinger.com"
                      data-testid="smtp-host-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="port">Port</Label>
                    <Input
                      id="port"
                      type="number"
                      value={smtpSettings.port}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                      placeholder="587"
                      data-testid="smtp-port-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="username">Username (Email)</Label>
                    <Input
                      id="username"
                      value={smtpSettings.username}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
                      placeholder="your-email@tilolive.in"
                      data-testid="smtp-username-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={smtpSettings.password}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                      placeholder="Your SMTP password"
                      data-testid="smtp-password-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={smtpSettings.from_email}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, from_email: e.target.value })}
                      placeholder="noreply@tilolive.in"
                      data-testid="smtp-from-email-input"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fromName">From Name</Label>
                    <Input
                      id="fromName"
                      value={smtpSettings.from_name}
                      onChange={(e) => setSmtpSettings({ ...smtpSettings, from_name: e.target.value })}
                      placeholder="Tilo Live"
                      data-testid="smtp-from-name-input"
                    />
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2">Hostinger SMTP Info</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Host: smtp.hostinger.com</li>
                    <li>• Port: 587 (TLS) or 465 (SSL)</li>
                    <li>• Username: Your full email address</li>
                    <li>• Password: Your email password</li>
                  </ul>
                </div>

                <Button onClick={handleSaveSMTP} disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600" data-testid="save-smtp-button">
                  {loading ? 'Saving...' : 'Save SMTP Settings'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
