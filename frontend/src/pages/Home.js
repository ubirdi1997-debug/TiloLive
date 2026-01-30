import { useEffect, useState } from 'react';
import { MessageSquare, Gem, TrendingUp, Users, Video, MessageCircle, Gift, Clock, CheckCircle, XCircle, Shield, Zap, Target, Award } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [settings, setSettings] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
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
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter`, { email });
      toast.success('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, contactForm);
      toast.success('Message sent successfully!');
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsappNumber || '+918266941716';
  const headerLogo = settings?.headerLogo || 'https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/apt27ol5_Firefly_Gemini%20Flash_ADD%20%20TEXT%20TO%20THE%20RIGHT%20TILO%20AGENCY%20422800.png';
  const footerLogo = settings?.footerLogo || 'https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/apt27ol5_Firefly_Gemini%20Flash_ADD%20%20TEXT%20TO%20THE%20RIGHT%20TILO%20AGENCY%20422800.png';
  const companyName = settings?.companyName || 'Tilo Agency';
  const currentYear = new Date().getFullYear();

  const commissionTiers = [
    { hosts: '1-5', rate: '8%', bonus: '₹2,000' },
    { hosts: '6-15', rate: '10%', bonus: '₹5,000' },
    { hosts: '16-30', rate: '12%', bonus: '₹10,000' },
    { hosts: '31-50', rate: '15%', bonus: '₹20,000' },
    { hosts: '51+', rate: '18%', bonus: '₹30,000' },
  ];

  return (
    <div className=\"min-h-screen bg-black\" data-testid=\"home-page\">
      {/* Dark Navbar */}
      <nav className=\"fixed w-full top-0 z-50 nav-dark\" data-testid=\"main-navbar\">
        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">
          <div className=\"flex justify-between items-center h-20\">
            <img src={headerLogo} alt=\"Tilo Agency\" className=\"h-12 md:h-14\" />
            
            <div className=\"hidden md:flex items-center space-x-2\">
              <a href=\"#home\" className=\"px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors\">Home</a>
              <a href=\"#about\" className=\"px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors\">About</a>
              <a href=\"#commission\" className=\"px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors\">Commission</a>
              <a href=\"#benefits\" className=\"px-4 py-2 text-sm font-medium text-gray-300 hover:text-orange-500 transition-colors\">Benefits</a>
              <a href=\"#contact\" className=\"px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all\">Get Started</a>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className=\"md:hidden text-white\">
              <svg className=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                {mobileMenuOpen ? (
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M6 18L18 6M6 6l12 12\" />
                ) : (
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M4 6h16M4 12h16M4 18h16\" />
                )}
              </svg>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className=\"md:hidden py-4 border-t border-gray-800\">
              <a href=\"#home\" onClick={() => setMobileMenuOpen(false)} className=\"block px-4 py-3 text-sm text-gray-300 hover:text-orange-500\">Home</a>
              <a href=\"#about\" onClick={() => setMobileMenuOpen(false)} className=\"block px-4 py-3 text-sm text-gray-300 hover:text-orange-500\">About</a>
              <a href=\"#commission\" onClick={() => setMobileMenuOpen(false)} className=\"block px-4 py-3 text-sm text-gray-300 hover:text-orange-500\">Commission</a>
              <a href=\"#benefits\" onClick={() => setMobileMenuOpen(false)} className=\"block px-4 py-3 text-sm text-gray-300 hover:text-orange-500\">Benefits</a>
              <a href=\"#contact\" onClick={() => setMobileMenuOpen(false)} className=\"block px-4 py-3 text-sm text-white bg-orange-500 rounded-lg text-center mt-2\">Get Started</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Split Design */}
      <section id=\"home\" className=\"hero-dark pt-32 pb-20 px-4 min-h-screen flex items-center relative\">
        <div className=\"max-w-7xl mx-auto w-full relative z-10\">
          <div className=\"grid lg:grid-cols-2 gap-12 items-center\">
            <div className=\"space-y-8\">
              <div className=\"badge-orange\">
                <span className=\"pulse-dot\"></span>
                <span>India's Leading Agency Network</span>
              </div>
              
              <h1 className=\"text-5xl sm:text-6xl lg:text-7xl font-bold\" style={{ fontFamily: 'Sora, sans-serif', lineHeight: '1.1' }}>
                Build Your <span className=\"gradient-text\">Agency Empire</span> with Tilo
              </h1>
              
              <p className=\"text-xl text-gray-400 leading-relaxed\">
                Partner with India's fastest-growing live streaming platform. Recruit talented hosts, earn industry-leading commissions, and scale your business with full support.
              </p>
              
              <div className=\"flex flex-col sm:flex-row gap-4\">
                <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20become%20a%20Tilo%20Agency%20Partner`} target=\"_blank\" rel=\"noopener noreferrer\" className=\"btn-glow inline-flex items-center justify-center gap-2\">
                  Start Your Agency
                  <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                    <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M17 8l4 4m0 0l-4 4m4-4H3\" />
                  </svg>
                </a>
                <a href=\"#commission\" className=\"btn-outline-dark inline-flex items-center justify-center gap-2\">
                  View Commission Structure
                </a>
              </div>

              {/* Stats */}
              <div className=\"grid grid-cols-3 gap-4 pt-8\">
                <div className=\"text-center\">
                  <div className=\"stat-number\">500+</div>
                  <div className=\"text-sm text-gray-500 mt-2\">Active Agencies</div>
                </div>
                <div className=\"text-center\">
                  <div className=\"stat-number\">10K+</div>
                  <div className=\"text-sm text-gray-500 mt-2\">Hosts Network</div>
                </div>
                <div className=\"text-center\">
                  <div className=\"stat-number\">₹5Cr+</div>
                  <div className=\"text-sm text-gray-500 mt-2\">Paid Out</div>
                </div>
              </div>
            </div>

            {/* Right Side - Floating Card */}
            <div className=\"relative float-element\">
              <div className=\"glass-card\">
                <div className=\"flex items-center gap-3 mb-6\">
                  <div className=\"w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center\">
                    <TrendingUp size={28} className=\"text-white\" />
                  </div>
                  <div>
                    <h3 className=\"text-2xl font-bold\" style={{ fontFamily: 'Sora, sans-serif' }}>Commission Calculator</h3>
                    <p className=\"text-gray-500 text-sm\">Your potential earnings</p>
                  </div>
                </div>
                
                <div className=\"space-y-4\">
                  <div className=\"bg-white/5 rounded-xl p-4 border border-white/10\">
                    <div className=\"text-gray-400 text-sm mb-1\">If your hosts earn</div>
                    <div className=\"text-3xl font-bold gradient-text\">₹1,00,000/month</div>
                  </div>
                  <div className=\"flex items-center gap-3\">
                    <div className=\"flex-1 h-2 bg-white/10 rounded-full overflow-hidden\">
                      <div className=\"h-full bg-gradient-to-r from-orange-500 to-red-500\" style={{width: '15%'}}></div>
                    </div>
                    <span className=\"text-sm font-semibold text-orange-500\">15%</span>
                  </div>
                  <div className=\"bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-orange-500/30\">
                    <div className=\"text-gray-400 text-sm mb-1\">You earn</div>
                    <div className=\"text-4xl font-bold text-white\">₹15,000</div>
                    <div className=\"text-sm text-gray-500 mt-1\">+ Performance bonuses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Bento Grid */}
      <section id=\"about\" className=\"section-padding bg-black\">
        <div className=\"max-w-7xl mx-auto px-4\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl sm:text-5xl font-bold mb-4\" style={{ fontFamily: 'Sora, sans-serif' }}>
              Why Partner with <span className=\"gradient-text\">Tilo Agency</span>
            </h2>
            <p className=\"text-xl text-gray-400\">Everything you need to succeed as an agency partner</p>
          </div>

          <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-6\">
            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Zap className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">Industry-Leading Commission</h3>
              <p className=\"text-gray-400\">Earn 8% to 18% commission on all host earnings plus performance bonuses</p>
            </div>

            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Target className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">Weekly Payouts</h3>
              <p className=\"text-gray-400\">Get paid every Wednesday via secure Epay system with zero delays</p>
            </div>

            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Users className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">Unlimited Team Growth</h3>
              <p className=\"text-gray-400\">No cap on team size - recruit as many hosts as you can manage</p>
            </div>

            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Shield className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">24/7 Agent Support</h3>
              <p className=\"text-gray-400\">Dedicated support team to help you and your hosts succeed</p>
            </div>

            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Award className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">Performance Bonuses</h3>
              <p className=\"text-gray-400\">Extra rewards for top-performing agencies and consistent growth</p>
            </div>

            <div className=\"bento-card\">
              <div className=\"w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4\">
                <Video className=\"text-orange-500\" size={28} />
              </div>
              <h3 className=\"text-xl font-bold mb-3\">Training & Resources</h3>
              <p className=\"text-gray-400\">Complete training materials and tools to onboard your hosts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section id=\"commission\" className=\"section-padding bg-gradient-to-b from-black to-gray-900\">
        <div className=\"max-w-6xl mx-auto px-4\">
          <div className=\"text-center mb-16\">
            <h2 className=\"text-4xl sm:text-5xl font-bold mb-4\" style={{ fontFamily: 'Sora, sans-serif' }}>
              <span className=\"gradient-text\">Transparent</span> Commission Structure
            </h2>
            <p className=\"text-xl text-gray-400\">Your earnings grow as your team grows</p>
          </div>

          <div className=\"glass-card\">
            <table>
              <thead>
                <tr>
                  <th>TEAM SIZE</th>
                  <th>COMMISSION RATE</th>
                  <th>MONTHLY BONUS</th>
                </tr>
              </thead>
              <tbody>
                {commissionTiers.map((tier, index) => (
                  <tr key={index}>
                    <td className=\"font-semibold\">{tier.hosts} Hosts</td>
                    <td className=\"text-2xl font-bold gradient-text\">{tier.rate}</td>
                    <td className=\"text-xl\">{tier.bonus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className=\"mt-8 bg-orange-500/10 border border-orange-500/30 rounded-2xl p-6\">
            <h4 className=\"text-lg font-bold mb-2\">💡 Example Calculation</h4>
            <p className=\"text-gray-400 text-sm\">If you have 20 hosts earning ₹50,000 each (₹10,00,000 total), you earn ₹1,20,000 (12%) + ₹10,000 bonus = <span className=\"text-orange-500 font-bold\">₹1,30,000/month</span></p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id=\"contact\" className=\"section-padding bg-black\">
        <div className=\"max-w-4xl mx-auto px-4\">
          <div className=\"text-center mb-12\">
            <h2 className=\"text-4xl sm:text-5xl font-bold mb-4\" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to Start?
            </h2>
            <p className=\"text-xl text-gray-400\">Get in touch with us today</p>
          </div>

          <div className=\"glass-card\">
            <form onSubmit={handleContactSubmit} className=\"space-y-6\">
              <div className=\"grid md:grid-cols-2 gap-6\">
                <input type=\"text\" placeholder=\"Full Name\" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} required className=\"w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all\" />
                <input type=\"email\" placeholder=\"Email\" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} required className=\"w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all\" />
              </div>
              <div className=\"grid md:grid-cols-2 gap-6\">
                <input type=\"tel\" placeholder=\"Phone\" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} className=\"w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all\" />
                <input type=\"text\" placeholder=\"Subject\" value={contactForm.subject} onChange={(e) => setContactForm({...contactForm, subject: e.target.value})} required className=\"w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all\" />
              </div>
              <textarea placeholder=\"Your Message\" value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} required rows=\"6\" className=\"w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-all resize-none\" />
              <button type=\"submit\" disabled={loading} className=\"btn-glow w-full\">{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=\"bg-black border-t border-gray-900 py-12\">
        <div className=\"max-w-7xl mx-auto px-4\">
          <div className=\"grid md:grid-cols-3 gap-8 mb-8\">
            <div>
              <img src={footerLogo} alt=\"Tilo Agency\" className=\"h-10 mb-4\" />
              <p className=\"text-gray-500 text-sm\">India's leading live streaming agency network</p>
            </div>
            <div>
              <h3 className=\"text-lg font-semibold mb-4\">Quick Links</h3>
              <div className=\"space-y-2\">
                <a href=\"#home\" className=\"block text-gray-400 hover:text-orange-500 transition-colors text-sm\">Home</a>
                <a href=\"#about\" className=\"block text-gray-400 hover:text-orange-500 transition-colors text-sm\">About</a>
                <a href=\"#commission\" className=\"block text-gray-400 hover:text-orange-500 transition-colors text-sm\">Commission</a>
              </div>
            </div>
            <div>
              <h3 className=\"text-lg font-semibold mb-4\">Contact</h3>
              <p className=\"text-gray-400 text-sm mb-2\">support@tiloagency.com</p>
              <p className=\"text-gray-400 text-sm\">Phone: {settings?.contactPhone}</p>
            </div>
          </div>
          <div className=\"text-center border-t border-gray-900 pt-8 space-y-2\">
            <p className=\"text-gray-500 text-sm\">Developed & Maintained By <a href=\"https://usafe.in\" target=\"_blank\" rel=\"noopener noreferrer\" className=\"text-orange-500 hover:text-orange-400 font-semibold\">Urbanesafe LLP</a></p>
            <p className=\"text-gray-500 text-sm\">&copy; {currentYear} {companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float */}
      <a href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20know%20more%20about%20Tilo%20Agency`} target=\"_blank\" rel=\"noopener noreferrer\" className=\"fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50\">
        <MessageSquare size={28} className=\"text-white\" />
      </a>
    </div>
  );
};

export default Home;
