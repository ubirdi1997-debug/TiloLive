import { useEffect, useState } from 'react';
import { MessageSquare, Gem, TrendingUp, Shield, Mail, Video, MessageCircle, Gift, Clock, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { getBackendUrl } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const BACKEND_URL = getBackendUrl();
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
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
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
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappNumber = settings?.whatsappNumber || '+918266941716';
  const headerLogo = settings?.headerLogo || 'https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/cd62r0gu_wbandxtqn5ktf3j6bzylmi1jnea-mv0p56qjkefznk1k-OT1NoOkggDJNZCyY.png';
  const footerLogo = settings?.footerLogo || 'https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/cd62r0gu_wbandxtqn5ktf3j6bzylmi1jnea-mv0p56qjkefznk1k-OT1NoOkggDJNZCyY.png';
  const companyName = settings?.companyName || 'Tilo Live';
  const currentYear = new Date().getFullYear();

  const salarySheet = [
    { coins: 40000, rupees: 800 },
    { coins: 80000, rupees: 1600 },
    { coins: 120000, rupees: 2400 },
    { coins: 160000, rupees: 3200 },
    { coins: 200000, rupees: 4000 },
    { coins: 240000, rupees: 4800 },
    { coins: 280000, rupees: 5600 },
    { coins: 320000, rupees: 6400 },
    { coins: 360000, rupees: 7200 },
    { coins: 400000, rupees: 8000 },
  ];

  const diamondSalary = [
    { diamond: '20,000', salary: 5, bonus: '-' },
    { diamond: '40,000', salary: 10, bonus: '-' },
    { diamond: '80,000', salary: 20, bonus: '-' },
    { diamond: '160,000', salary: 40, bonus: 3 },
    { diamond: '320,000', salary: 80, bonus: 5 },
    { diamond: '480,000', salary: 120, bonus: 10 },
    { diamond: '760,000', salary: 190, bonus: 15 },
    { diamond: '920,000', salary: 230, bonus: 20 },
  ];

  const fixedSalary = [
    { duration: '700min', avgCall: '2min', salary: 20 },
    { duration: '800min', avgCall: '2.5min', salary: 25 },
    { duration: '1000min', avgCall: '3min', salary: 30 },
    { duration: '1300min', avgCall: '3.5min', salary: 35 },
    { duration: '1500min', avgCall: '4min', salary: 50 },
  ];

  const agencySalary = [
    { total: '0-100', share: '5%', bonus: '-' },
    { total: '101-500', share: '8%', bonus: '-' },
    { total: '501-1000', share: '10%', bonus: 5 },
    { total: '1001-1500', share: '12%', bonus: 10 },
    { total: '1501-3000', share: '15%', bonus: 20 },
    { total: '3001-5000', share: '18%', bonus: 30 },
    { total: '≥5001', share: '20%', bonus: 50 },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Navbar with Mobile Menu */}
      <nav className="fixed w-full top-0 z-50 glass-effect border-b border-gray-100" data-testid="main-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <img 
                src={headerLogo}
                alt="Tilo Live Logo" 
                className="h-12 md:h-14 transition-all duration-300"
              />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">Home</a>
              <a href="#about" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">About</a>
              <a href="#tilo-agency" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">Tilo Agency</a>
              <a href="#tilo-streamer" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">Tilo Streamer</a>
              <a href="#salary" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">Salary</a>
              <a href="#rules" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-300">Rules</a>
              <a href="#contact" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-600 hover:from-orange-700 hover:to-orange-700 rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40">Contact</a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100" data-testid="mobile-menu">
              <div className="flex flex-col space-y-2">
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Home</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">About</a>
                <a href="#tilo-agency" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Tilo Agency</a>
                <a href="#tilo-streamer" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Tilo Streamer</a>
                <a href="#salary" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Salary</a>
                <a href="#rules" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-all">Rules</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-orange-600 to-orange-600 rounded-xl text-center">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden" data-testid="hero-section" style={{background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #ffffff 100%)'}}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border-2 border-orange-200 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
                <span className="text-sm font-bold text-orange-700">Welcome to Tilo Agency</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid="hero-headline">
                Join Tilo Agency and <span className="text-gradient relative inline-block">
                  Start Earning
                  <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 10C50 3 150 3 198 10" stroke="#f97316" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span> Today
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium" data-testid="hero-subheadline">
                Become a Host or Agent and unlock flexible payouts, exclusive rewards, and professional growth opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20a%20Host%20at%20Tilo%20Agency`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
                  data-testid="cta-host-button"
                >
                  <span className="relative z-10">I'm a Host</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20an%20Agent%20at%20Tilo%20Agency`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-orange-600 bg-white border-3 border-orange-500 rounded-2xl shadow-lg hover:bg-orange-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  data-testid="cta-agent-button"
                >
                  I'm an Agent
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Enhanced Salary Sheet Card */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-400 rounded-2xl blur-md opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Gem className="text-white" size={28} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Official Salary Sheet
                    </h3>
                    <p className="text-sm text-gray-500 font-semibold">Transparent earnings structure</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border-2 border-orange-200 shadow-inner">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500">
                        <th className="text-left py-4 px-5 font-bold text-white text-sm tracking-wide">COINS TARGET</th>
                        <th className="text-right py-4 px-5 font-bold text-white text-sm tracking-wide">PAYOUT (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gradient-to-b from-orange-50/30 to-white">
                      {salarySheet.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-t-2 border-orange-100 hover:bg-orange-100/50 transition-all duration-200 group">
                          <td className="py-4 px-5 text-gray-800 font-bold text-base">{row.coins.toLocaleString()}</td>
                          <td className="text-right py-4 px-5 font-black text-lg">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 group-hover:from-orange-500 group-hover:to-orange-600">
                              ₹ {row.rupees.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <a href="#salary" className="mt-5 text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2 group px-4 py-2 hover:bg-orange-50 rounded-xl transition-all">
                  View complete salary structure
                  <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gradient-to-b from-white to-orange-50/30" data-testid="about-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-wider">About Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              About <span className="text-gradient relative">
                Tilo Agency
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316"/>
                      <stop offset="100%" stopColor="#ea580c"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              Experience live streaming like never before
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                  <h3 className="text-3xl font-black text-gray-900">Your Gateway to Live Entertainment</h3>
                </div>
              </div>
              <div className="space-y-6 pl-6 border-l-4 border-orange-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Tilo Agency is a live streaming and social interaction platform built for creators, agencies, and streamers to grow and earn together. The app combines live streaming, video chat, text messaging, and virtual gifting into one smooth and engaging experience.
                </p>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Join thousands of hosts and agents who are earning through our innovative platform. Whether you're a content creator, influencer, or someone looking to monetize your social presence, Tilo Agency provides all the tools you need to succeed.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Tell%20me%20more%20about%20Tilo%20Agency`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-orange-50 via-orange-100/50 to-orange-50 rounded-3xl p-10 shadow-2xl border-2 border-orange-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-300">
                    <div className="text-4xl font-black bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">10K+</div>
                    <p className="text-gray-600 text-sm font-semibold">Active Hosts</p>
                  </div>
                  <div className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-300">
                    <div className="text-4xl font-black bg-gradient-to-br from-cyan-500 to-blue-500 bg-clip-text text-transparent mb-2">500+</div>
                    <p className="text-gray-600 text-sm font-semibold">Agencies</p>
                  </div>
                  <div className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-300">
                    <div className="text-4xl font-black bg-gradient-to-br from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">24/7</div>
                    <p className="text-gray-600 text-sm font-semibold">Support</p>
                  </div>
                  <div className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-orange-100 hover:border-orange-300">
                    <div className="text-4xl font-black bg-gradient-to-br from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2">$1M+</div>
                    <p className="text-gray-600 text-sm font-semibold">Paid Out</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tilo Agency Section */}
      <section id="tilo-agency" className="section-padding gradient-bg" data-testid="tilo-agency-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Tilo Agency Partner Program
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Build a long-term earning source in the live streaming industry
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Become a Tilo Agent</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tilo Agency is an official partner program of the Tilo App, designed to provide strong income opportunities for agents who recruit and manage hosts or streamers. By completing Tilo app agency registration, agents can build a long-term earning source in the live streaming and video chat industry.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700"><strong>Recruit & Earn:</strong> Build your team of hosts and earn commission on their earnings</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700"><strong>Instant Payouts:</strong> Get paid weekly through secure Epay system</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700"><strong>24/7 Support:</strong> Dedicated agent support team to help you grow</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <p className="text-gray-700"><strong>Growth Bonuses:</strong> Additional rewards as your team expands</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Why Join as Agent?</h4>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-white" size={20} />
                      </div>
                      <h5 className="font-semibold text-gray-900">High Commission Rates</h5>
                    </div>
                    <p className="text-sm text-gray-600">Earn 5% to 20% commission based on your team's performance</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center">
                        <Users className="text-white" size={20} />
                      </div>
                      <h5 className="font-semibold text-gray-900">Build Your Team</h5>
                    </div>
                    <p className="text-sm text-gray-600">No limit on team size - grow as big as you want</p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Gem className="text-white" size={20} />
                      </div>
                      <h5 className="font-semibold text-gray-900">Performance Bonuses</h5>
                    </div>
                    <p className="text-sm text-gray-600">Additional bonuses for top-performing agencies</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20join%20as%20Tilo%20Agent`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Join as Tilo Agent →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tilo Streamer Section */}
      <section id="tilo-streamer" className="section-padding bg-white" data-testid="tilo-streamer-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Tilo <span className="text-gradient">Streamer</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start your live streaming journey and earn from day one
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="relative order-2 md:order-1">
              <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
                <img 
                  src="https://customer-assets.emergentagent.com/job_tilo-rebrand/artifacts/07tlhj0c_Phone%20Screens.png" 
                  alt="Tilo Live App Screens" 
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-gray-900">Become a Host & Start Earning</h3>
              <p className="text-gray-600 leading-relaxed">
                Join Tilo Agency as a streamer and connect with audiences worldwide. Whether you want to showcase your talent, share your daily life, or build a community, Tilo provides the perfect platform to monetize your content.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Video className="text-sky-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Live Video Streaming</h5>
                    <p className="text-sm text-gray-600">Go live anytime and earn from video calls and gifts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="text-cyan-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Chat & Connect</h5>
                    <p className="text-sm text-gray-600">Build relationships through text chat and earn from replies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Receive Gifts</h5>
                    <p className="text-sm text-gray-600">Get virtual gifts from fans and convert them to real cash</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gem className="text-green-500 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">Flexible Earnings</h5>
                    <p className="text-sm text-gray-600">Work on your schedule and withdraw anytime</p>
                  </div>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20join%20as%20Tilo%20Streamer%20at%20Tilo%20Agency`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Join as Tilo Streamer →
              </a>
            </div>
          </div>

          {/* App Features */}
          <div className="relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-orange-100 rounded-3xl blur-2xl opacity-50"></div>
            <div className="relative bg-gradient-to-br from-orange-50/80 to-white rounded-3xl p-10 sm:p-14 border-2 border-orange-200 shadow-2xl">
              <h3 className="text-3xl font-black text-center mb-12 text-gray-900">🎯 Tilo App Features</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-300">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-sky-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-sky-400 to-sky-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <Video className="text-white" size={32} />
                    </div>
                  </div>
                  <h4 className="font-black text-gray-900 mb-3 text-xl">Live Streaming</h4>
                  <p className="text-gray-600 leading-relaxed">High-quality video streaming with real-time interaction</p>
                </div>
                <div className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-300">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-cyan-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <MessageCircle className="text-white" size={32} />
                    </div>
                  </div>
                  <h4 className="font-black text-gray-900 mb-3 text-xl">Private Calls</h4>
                  <p className="text-gray-600 leading-relaxed">One-on-one video calls with premium earnings</p>
                </div>
                <div className="group bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-orange-300">
                  <div className="relative mb-6 inline-block">
                    <div className="absolute inset-0 bg-orange-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                      <Gift className="text-white" size={32} />
                    </div>
                  </div>
                  <h4 className="font-black text-gray-900 mb-3 text-xl">Virtual Gifting</h4>
                  <p className="text-gray-600 leading-relaxed">Receive and convert gifts to diamonds instantly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Section */}
      <section id="salary" className="section-padding bg-gradient-to-b from-white via-orange-50/20 to-white" data-testid="salary-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-bold uppercase tracking-wider">💰 Earnings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our <span className="text-gradient relative inline-block">
                Salary Structure
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C50 2 150 2 198 6" stroke="url(#gradient2)" strokeWidth="2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316"/>
                      <stop offset="100%" stopColor="#ea580c"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">Our salary structure is designed to reward Hosts and Agents fairly based on Diamonds, Calls, and Agent performance.</p>
          </div>

          {/* Diamonds Salary Table */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-sky-400 rounded-xl blur-md opacity-40"></div>
                <div className="relative bg-gradient-to-br from-sky-400 to-sky-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Gem className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900">Diamond Salary</h3>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-sky-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600">
                        <th className="text-left py-4 px-6 font-bold text-white text-sm tracking-wide">DIAMOND</th>
                        <th className="text-center py-4 px-6 font-bold text-white text-sm tracking-wide">DIAMOND SALARY (USD)</th>
                        <th className="text-right py-4 px-6 font-bold text-white text-sm tracking-wide">HOST BONUS (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gradient-to-b from-sky-50/30 to-white">
                      {diamondSalary.map((row, index) => (
                        <tr key={index} className="border-t-2 border-sky-100 hover:bg-sky-100/60 transition-all duration-200 group/row">
                          <td className="py-4 px-6 text-gray-800 font-bold">{row.diamond}</td>
                          <td className="text-center py-4 px-6 font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 group-hover/row:from-sky-500 group-hover/row:to-blue-500">${row.salary}</td>
                          <td className="text-right py-4 px-6 text-gray-700 font-semibold">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl border-2 border-sky-200">
                  <div className="space-y-2 text-sm text-gray-700 font-medium">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                      Maximum Rate: 4000 Diamonds = 1 USD
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                      Host salary = Diamond salary + Host Bonus + Fixed salary
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                      Diamonds achieving 20k will be settled
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Salary Table */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-xl blur-md opacity-40"></div>
                <div className="relative bg-gradient-to-br from-cyan-400 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900">Fixed Salary</h3>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-cyan-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-cyan-500 via-cyan-600 to-teal-600">
                        <th className="text-left py-4 px-6 font-bold text-white text-sm tracking-wide">PRIVATE CALL DURATION/WEEK</th>
                        <th className="text-center py-4 px-6 font-bold text-white text-sm tracking-wide">AVERAGE CALL DURATION</th>
                        <th className="text-right py-4 px-6 font-bold text-white text-sm tracking-wide">FIXED SALARY (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gradient-to-b from-cyan-50/30 to-white">
                      {fixedSalary.map((row, index) => (
                        <tr key={index} className="border-t-2 border-cyan-100 hover:bg-cyan-100/60 transition-all duration-200 group/row">
                          <td className="py-4 px-6 text-gray-800 font-bold">{row.duration}</td>
                          <td className="text-center py-4 px-6 text-gray-700 font-semibold">{row.avgCall}</td>
                          <td className="text-right py-4 px-6 font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-600 group-hover/row:from-cyan-500 group-hover/row:to-teal-500">${row.salary}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Agency Salary Table */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 rounded-xl blur-md opacity-40"></div>
                <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-gray-900">Agency Salary</h3>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-orange-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                        <th className="text-left py-4 px-6 font-bold text-white text-sm tracking-wide">HOST TOTAL SALARY (USD)</th>
                        <th className="text-center py-4 px-6 font-bold text-white text-sm tracking-wide">AGENT SHARE</th>
                        <th className="text-right py-4 px-6 font-bold text-white text-sm tracking-wide">AGENT BONUS (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gradient-to-b from-orange-50/30 to-white">
                      {agencySalary.map((row, index) => (
                        <tr key={index} className="border-t-2 border-orange-100 hover:bg-orange-100/60 transition-all duration-200 group/row">
                          <td className="py-4 px-6 text-gray-800 font-bold">{row.total}</td>
                          <td className="text-center py-4 px-6 font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 group-hover/row:from-orange-500 group-hover/row:to-red-500">{row.share}</td>
                          <td className="text-right py-4 px-6 text-gray-700 font-semibold">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                  <div className="space-y-2 text-sm text-gray-700 font-medium">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Agent Salary = Agent commission + Agent Bonus
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      If an agency's total income does not meet $20 for a week, it will not be paid but can be accumulated to the next week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding gradient-bg" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              New Host Benefits
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Earn <strong>Double Diamonds</strong> for their first 20 calls (including matched and private calls) within 48 hours of being approved as a host.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Each new host can earn up to <strong>20,000 diamonds</strong>.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl">🟢</span>
                <p className="text-lg text-gray-700">Bonus will be calculated on salary report of host.</p>
              </div>
            </div>
          </div>

          {/* Settlement Details */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Get Secure Payouts and Flexible Diamond-to-Cash Conversion Through Epay
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-sky-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Settlement Details</h4>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Method:</strong> Epay</p>
                  <p><strong>Cycle:</strong> Monday 00:00 to Sunday 24:00</p>
                  <p><strong>Cut-off:</strong> Sunday Midnight (24:00)</p>
                  <p><strong>Pay Day:</strong> Every Wednesday</p>
                  <p className="text-sm text-gray-600">(Salary reports sent on Tuesday)</p>
                </div>
              </div>
              <div className="bg-cyan-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">Requirements</h4>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    Agency must reach <strong>$20</strong>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={20} />
                    Host must reach <strong>20,000 Diamonds</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Earning Methods Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-sky-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="text-sky-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Video Call Rates</h3>
              <p className="text-gray-600 mb-2">Earn <strong className="text-sky-600">196 💎</strong> for 30 seconds</p>
              <p className="text-gray-600">Earn <strong className="text-sky-600">294 💎</strong> for a full minute</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-cyan-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Reply Rewards</h3>
              <p className="text-gray-600 mb-2">Reply within 2 min: <strong className="text-cyan-600">15 💎</strong></p>
              <p className="text-gray-600 mb-2">Reply within 30 min: <strong className="text-cyan-600">7 💎</strong></p>
              <p className="text-gray-600">Reply after 30 min: <strong className="text-gray-400">0 💎</strong></p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="text-orange-600" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Virtual Gifts</h3>
              <p className="text-gray-600">Receive gifts during calls to boost your diamond count instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="rules" className="section-padding bg-white" data-testid="rules-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Host <span className="text-gradient">Rules</span>
            </h2>
            <p className="text-lg text-gray-600">Follow the rules to maintain your level, avoid penalties, and maximize your income.</p>
          </div>

          {/* Call Rejection Rules - Timeline */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Call Rejection Rules</h3>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-400 to-red-500"></div>
              
              <div className="space-y-8 relative">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    1-2
                  </div>
                  <div className="flex-1 bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
                    <h4 className="font-bold text-gray-900 mb-2">Warning</h4>
                    <p className="text-gray-600">First and second call rejections result in a warning</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    3
                  </div>
                  <div className="flex-1 bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
                    <h4 className="font-bold text-gray-900 mb-2">2h Suspension + Demotion</h4>
                    <p className="text-gray-600">Third rejection leads to 2-hour suspension and level demotion</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    4
                  </div>
                  <div className="flex-1 bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <h4 className="font-bold text-gray-900 mb-2">24h Suspension + Traffic Block</h4>
                    <p className="text-gray-600">Fourth rejection results in 24-hour suspension and traffic blocking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Host Levels - Tier Badges */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-gray-900">Host Levels</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  S
                </div>
                <p className="font-semibold text-gray-900">S Level</p>
                <p className="text-sm text-gray-600">Premium</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  A
                </div>
                <p className="font-semibold text-gray-900">A Level</p>
                <p className="text-sm text-gray-600">High Tier</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  B
                </div>
                <p className="font-semibold text-gray-900">B Level</p>
                <p className="text-sm text-gray-600">Mid Tier</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold text-3xl shadow-xl">
                  C
                </div>
                <p className="font-semibold text-gray-900">C Level</p>
                <p className="text-sm text-gray-600">Entry</p>
              </div>
            </div>
            <div className="bg-sky-50 rounded-xl p-6 border border-sky-200">
              <p className="text-center text-gray-700"><strong>Pro Tip:</strong> Exchange rate is <strong className="text-sky-600">4000 💎 = $1 USD</strong></p>
            </div>
          </div>

          {/* Perfect Host Requirements - Split Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">✅ The Perfect Host</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Lighting:</strong> Keep the room bright and well-lit</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Visibility:</strong> Show your full face in the video call</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Engagement:</strong> Take the initiative to greet users and smile</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Appearance:</strong> Wear makeup and dress decently</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Eligibility:</strong> Female hosts only (Age 18 to 45)</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border-2 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="text-red-600" size={32} />
                <h3 className="text-2xl font-bold text-gray-900">❌ Immediate Prohibitions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Personal Info:</strong> DO NOT share contact details (WhatsApp, Phone numbers)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Obscurity:</strong> Do not hide your face or show only part of it</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Environment:</strong> No black screens or dark rooms</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-gray-700"><strong>Behavior:</strong> No ignoring or disrespecting users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding gradient-bg" data-testid="contact-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Get in Touch
            </h2>
            <p className="text-lg text-white/90">Have questions? We're here to help.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img 
                src={footerLogo}
                alt="Tilo Live" 
                className="h-10 mb-4 brightness-0 invert"
              />
              <p className="text-gray-400 text-sm">
                Professional live streaming platform connecting hosts and audiences worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">Home</a>
                <a href="#about" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">About Us</a>
                <a href="#tilo-agency" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">Tilo Agency</a>
                <a href="#tilo-streamer" className="block text-gray-400 hover:text-orange-400 transition-colors text-sm">Tilo Streamer</a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400 text-sm mb-2">support@tilolive.in</p>
              <p className="text-gray-400 text-sm mb-4">Phone: {settings?.contactPhone || '+91 82669 41716'}</p>
              <a
                href={`https://whatsapp.com/channel/0029VbCCYeQ2P59t8LBOSe1V`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm"
              >
                <MessageSquare size={18} />
                Join WhatsApp Channel
              </a>
            </div>
          </div>
          <div className="text-center border-t border-gray-800 pt-8 space-y-2">
            <p className="text-gray-400 text-sm">
              Developed & Maintained By <a href="https://usafe.in" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 font-semibold">Urbanesafe LLP</a>
            </p>
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20have%20a%20question%20about%20Tilo%20Live`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all z-40 hover:scale-110"
        data-testid="whatsapp-float-button"
      >
        <MessageSquare size={32} />
      </a>
    </div>
  );
};

export default Home;
