import { useEffect, useState } from 'react';
import { MessageSquare, TrendingUp, Users, Shield, Phone, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API}/settings`);
        setSettings(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent!');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send');
    }
  };

  const whatsappNumber = settings?.whatsappNumber || '+918266941716';
  const headerLogo = settings?.headerLogo || 'https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/apt27ol5_Firefly_Gemini%20Flash_ADD%20%20TEXT%20TO%20THE%20RIGHT%20TILO%20AGENCY%20422800.png';
  const companyName = settings?.companyName || 'Tilo Agency';
  const currentYear = new Date().getFullYear();

  return (
    <div style={{backgroundColor: '#ffffff'}}>
      {/* Navigation */}
      <nav className="navbar">
        <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px'}}>
          <img src={headerLogo} alt="Tilo Agency" style={{height: '45px'}} />
          <div style={{display: mobileMenuOpen ? 'block' : 'none'}} className="mobile-only">
            <a href="#home" style={{display: 'block', padding: '12px', color: '#374151'}}>Home</a>
            <a href="#commission" style={{display: 'block', padding: '12px', color: '#374151'}}>Commission</a>
            <a href="#contact" style={{display: 'block', padding: '12px', color: '#374151'}}>Contact</a>
          </div>
          <div style={{display: 'flex', gap: '24px', alignItems: 'center'}} className="desktop-only">
            <a href="#home" style={{color: '#374151', textDecoration: 'none', fontWeight: '500'}}>Home</a>
            <a href="#commission" style={{color: '#374151', textDecoration: 'none', fontWeight: '500'}}>Commission</a>
            <a href="#contact" style={{color: '#374151', textDecoration: 'none', fontWeight: '500'}}>Contact</a>
            <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get Started</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{display: 'none', background: 'none', border: 'none', fontSize: '24px'}} className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', maxWidth: '1200px', margin: '0 auto'}}>
            <div>
              <div style={{display: 'inline-block', padding: '8px 16px', background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '50px', color: '#f97316', fontSize: '14px', fontWeight: '600', marginBottom: '24px'}}>
                🎯 Official Agency Partner
              </div>
              <h1 style={{fontSize: '52px', fontWeight: '800', color: '#111827', marginBottom: '24px', lineHeight: '1.1'}}>
                Partner with Tilo Agency
              </h1>
              <p style={{fontSize: '20px', color: '#6b7280', marginBottom: '32px', lineHeight: '1.6'}}>
                Join India's fastest-growing live streaming agency. Recruit hosts, build your team, and earn substantial commissions with transparent payouts.
              </p>
              <div style={{display: 'flex', gap: '16px'}}>
                <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Become an Agent →
                </a>
                <a href="#commission" className="btn btn-outline">View Commission</a>
              </div>
            </div>
            <div>
              <div className="card" style={{background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)', color: 'white', padding: '32px'}}>
                <h3 style={{fontSize: '24px', fontWeight: '700', marginBottom: '24px'}}>Commission Calculator</h3>
                <div style={{background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '12px', marginBottom: '16px'}}>
                  <div style={{fontSize: '14px', opacity: '0.9', marginBottom: '8px'}}>If your hosts earn</div>
                  <div style={{fontSize: '36px', fontWeight: '800'}}>₹1,00,000/month</div>
                </div>
                <div style={{height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', marginBottom: '16px'}}>
                  <div style={{width: '15%', height: '100%', background: 'white', borderRadius: '4px'}}></div>
                </div>
                <div style={{background: 'rgba(255,255,255,0.15)', padding: '20px', borderRadius: '12px'}}>
                  <div style={{fontSize: '14px', opacity: '0.9', marginBottom: '8px'}}>You earn (15%)</div>
                  <div style={{fontSize: '42px', fontWeight: '800'}}>₹15,000</div>
                  <div style={{fontSize: '14px', opacity: '0.8', marginTop: '8px'}}>+ Performance bonuses</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" style={{background: '#ffffff'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 className="section-title">Why Partner with Tilo Agency</h2>
            <p className="section-subtitle">Everything you need to succeed as an agency partner</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px'}}>
            <div className="card">
              <div style={{width: '50px', height: '50px', background: '#fff7ed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                <TrendingUp color="#f97316" size={28} />
              </div>
              <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#111827'}}>High Commission</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>Earn 8% to 18% commission on all host earnings plus performance bonuses</p>
            </div>
            <div className="card">
              <div style={{width: '50px', height: '50px', background: '#fff7ed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                <Users color="#f97316" size={28} />
              </div>
              <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#111827'}}>Unlimited Growth</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>No cap on team size - recruit as many hosts as you can manage</p>
            </div>
            <div className="card">
              <div style={{width: '50px', height: '50px', background: '#fff7ed', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                <Shield color="#f97316" size={28} />
              </div>
              <h3 style={{fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#111827'}}>Weekly Payouts</h3>
              <p style={{color: '#6b7280', lineHeight: '1.6'}}>Get paid every Wednesday via secure Epay system with zero delays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Table */}
      <section id="commission" className="section" style={{background: '#f9fafb'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 className="section-title">Commission Structure</h2>
            <p className="section-subtitle">Transparent earnings that grow with your team</p>
          </div>
          <div style={{maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
            <table>
              <thead>
                <tr>
                  <th>Team Size</th>
                  <th>Commission Rate</th>
                  <th>Monthly Bonus</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{fontWeight: '600'}}>1-5 Hosts</td>
                  <td style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>8%</td>
                  <td>₹2,000</td>
                </tr>
                <tr>
                  <td style={{fontWeight: '600'}}>6-15 Hosts</td>
                  <td style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>10%</td>
                  <td>₹5,000</td>
                </tr>
                <tr>
                  <td style={{fontWeight: '600'}}>16-30 Hosts</td>
                  <td style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>12%</td>
                  <td>₹10,000</td>
                </tr>
                <tr>
                  <td style={{fontWeight: '600'}}>31-50 Hosts</td>
                  <td style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>15%</td>
                  <td>₹20,000</td>
                </tr>
                <tr>
                  <td style={{fontWeight: '600'}}>51+ Hosts</td>
                  <td style={{fontSize: '20px', fontWeight: '700', color: '#f97316'}}>18%</td>
                  <td>₹30,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section" style={{background: '#ffffff'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 className="section-title">Get Started Today</h2>
            <p className="section-subtitle">Contact us to become a partner</p>
          </div>
          <div style={{maxWidth: '600px', margin: '0 auto'}}>
            <div className="card">
              <form onSubmit={handleContactSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <input type="text" placeholder="Full Name" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required />
                  <input type="email" placeholder="Email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required />
                </div>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                  <input type="tel" placeholder="Phone" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} />
                  <input type="text" placeholder="Subject" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} required />
                </div>
                <textarea placeholder="Your Message" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required rows="5" />
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{background: '#111827', color: 'white', padding: '60px 20px 40px'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', marginBottom: '40px'}}>
            <div>
              <img src={headerLogo} alt="Tilo Agency" style={{height: '40px', marginBottom: '16px', filter: 'brightness(0) invert(1)'}} />
              <p style={{color: '#9ca3af', fontSize: '14px'}}>India's leading live streaming agency network</p>
            </div>
            <div>
              <h4 style={{marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>Quick Links</h4>
              <a href="#home" style={{display: 'block', color: '#9ca3af', marginBottom: '8px', textDecoration: 'none'}}>Home</a>
              <a href="#commission" style={{display: 'block', color: '#9ca3af', marginBottom: '8px', textDecoration: 'none'}}>Commission</a>
              <a href="#contact" style={{display: 'block', color: '#9ca3af', textDecoration: 'none'}}>Contact</a>
            </div>
            <div>
              <h4 style={{marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>Contact</h4>
              <p style={{color: '#9ca3af', fontSize: '14px', marginBottom: '8px'}}>support@tiloagency.com</p>
              <p style={{color: '#9ca3af', fontSize: '14px'}}>Phone: {settings?.contactPhone || '+91 82669 41716'}</p>
            </div>
          </div>
          <div style={{borderTop: '1px solid #374151', paddingTop: '32px', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', fontSize: '14px', marginBottom: '8px'}}>
              Developed & Maintained By <a href="https://usafe.in" target="_blank" rel="noopener noreferrer" style={{color: '#f97316', fontWeight: '600'}}>Urbanesafe LLP</a>
            </p>
            <p style={{color: '#6b7280', fontSize: '14px'}}>&copy; {currentYear} {companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp */}
      <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{position: 'fixed', bottom: '24px', right: '24px', width: '60px', height: '60px', background: '#25D366', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: '1000'}}>
        <MessageSquare color="white" size={28} />
      </a>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .section { padding: 40px 20px !important; }
          div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
          h1 { font-size: 36px !important; }
          .section-title { font-size: 32px !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
