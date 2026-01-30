import { useEffect, useState } from 'react';
import { MessageSquare, Gem, TrendingUp, Shield, Mail, Video, MessageCircle, Gift, Clock, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
              <a href="#home" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">Home</a>
              <a href="#about" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">About</a>
              <a href="#tilo-agency" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">Tilo Agency</a>
              <a href="#tilo-streamer" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">Tilo Streamer</a>
              <a href="#salary" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">Salary</a>
              <a href="#rules" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300">Rules</a>
              <a href="#contact" className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40">Contact</a>
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
                <a href="#home" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Home</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">About</a>
                <a href="#tilo-agency" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Tilo Agency</a>
                <a href="#tilo-streamer" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Tilo Streamer</a>
                <a href="#salary" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Salary</a>
                <a href="#rules" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-xl transition-all">Rules</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-center">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient pt-32 pb-20 px-4 relative overflow-hidden" data-testid="hero-section">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border border-purple-200">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-purple-700">Welcome to Tilo Live</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }} data-testid="hero-headline">
                Join Tilo Live and <span className="text-gradient">Start Earning</span> Today
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed" data-testid="hero-subheadline">
                Become a Host or Agent and unlock flexible payouts, exclusive rewards, and professional growth opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20a%20Host%20at%20Tilo%20Live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-center group"
                  data-testid="cta-host-button"
                >
                  I'm a Host
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello,%20I%20want%20to%20be%20an%20Agent%20at%20Tilo%20Live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-center group"
                  data-testid="cta-agent-button"
                >
                  I'm an Agent
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Salary Sheet Table - Modern Design */}
            <div className="relative animate-float">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Gem className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      Official Salary Sheet
                    </h3>
                    <p className="text-sm text-gray-500">Transparent earnings structure</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-gray-100">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-purple-600 to-indigo-600">
                        <th className="text-left py-4 px-4 font-semibold text-white text-sm">Coins Target</th>
                        <th className="text-right py-4 px-4 font-semibold text-white text-sm">Payout (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salarySheet.slice(0, 5).map((row, index) => (
                        <tr key={index} className="border-t border-gray-100 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-300">
                          <td className="py-4 px-4 text-gray-700 font-medium">{row.coins.toLocaleString()}</td>
                          <td className="text-right py-4 px-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">₹ {row.rupees.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <a href="#salary" className="mt-4 text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-2 group">
                  View complete salary structure
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-white" data-testid="about-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              About <span className="text-gradient">Tilo Live</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience live streaming like never before
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Gateway to Live Entertainment</h3>
              <p className="text-gray-600 leading-relaxed">
                Tilo Live App is a live streaming and social interaction platform built for creators, agencies, and streamers to grow and earn together. The app combines live streaming, video chat, text messaging, and virtual gifting into one smooth and engaging experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of hosts and agents who are earning through our innovative platform. Whether you're a content creator, influencer, or someone looking to monetize your social presence, Tilo Live provides all the tools you need to succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Tell%20me%20more%20about%20Tilo%20Live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center justify-center gap-2 text-center"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-sky-100 to-cyan-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-sky-500 mb-2">10K+</div>
                    <p className="text-gray-600 text-sm">Active Hosts</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-cyan-500 mb-2">500+</div>
                    <p className="text-gray-600 text-sm">Agencies</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-purple-500 mb-2">24/7</div>
                    <p className="text-gray-600 text-sm">Support</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-green-500 mb-2">$1M+</div>
                    <p className="text-gray-600 text-sm">Paid Out</p>
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
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 shadow-2xl">
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
                Join Tilo Live as a streamer and connect with audiences worldwide. Whether you want to showcase your talent, share your daily life, or build a community, Tilo provides the perfect platform to monetize your content.
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
                  <Gift className="text-purple-500 flex-shrink-0 mt-1" size={20} />
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
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=I%20want%20to%20join%20as%20Tilo%20Streamer`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Join as Tilo Streamer →
              </a>
            </div>
          </div>

          {/* App Features */}
          <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Tilo App Features</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-sky-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="text-sky-600" size={28} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Live Streaming</h4>
                <p className="text-sm text-gray-600">High-quality video streaming with real-time interaction</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="text-cyan-600" size={28} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Private Calls</h4>
                <p className="text-sm text-gray-600">One-on-one video calls with premium earnings</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="text-purple-600" size={28} />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Virtual Gifting</h4>
                <p className="text-sm text-gray-600">Receive and convert gifts to diamonds instantly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Salary Section */}
      <section id="salary" className="section-padding bg-white" data-testid="salary-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Our <span className="text-gradient">Salary Structure</span>
            </h2>
            <p className="text-lg text-gray-600">Our salary structure is designed to reward Hosts and Agents fairly based on Diamonds, Calls, and Agent performance.</p>
          </div>

          {/* Diamonds Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Gem className="text-sky-500" size={28} />
              Diamond Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-sky-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Diamond</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Diamond Salary (USD)</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Host Bonus (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {diamondSalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-sky-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.diamond}</td>
                      <td className="text-center py-3 px-4 font-semibold text-sky-600">${row.salary}</td>
                      <td className="text-right py-3 px-4 text-gray-700">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Maximum Rate: 4000 Diamonds = 1 USD</p>
                <p>• Host salary = Diamond salary + Host Bonus + Fixed salary</p>
                <p>• Diamonds achieving 20k will be settled</p>
              </div>
            </div>
          </div>

          {/* Fixed Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <Clock className="text-cyan-500" size={28} />
              Fixed Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-cyan-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Private Call Duration/Week</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Average Call Duration</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Fixed Salary (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {fixedSalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-cyan-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.duration}</td>
                      <td className="text-center py-3 px-4 text-gray-700">{row.avgCall}</td>
                      <td className="text-right py-3 px-4 font-semibold text-cyan-600">${row.salary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Agency Salary Table */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-purple-500" size={28} />
              Agency Salary
            </h3>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-purple-500">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Host Total Salary (USD)</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Agent Share</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Agent Bonus (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {agencySalary.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-purple-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700">{row.total}</td>
                      <td className="text-center py-3 px-4 font-semibold text-purple-600">{row.share}</td>
                      <td className="text-right py-3 px-4 text-gray-700">{row.bonus === '-' ? '-' : `$${row.bonus}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>• Agent Salary = Agent commission + Agent Bonus</p>
                <p>• If an agency's total income does not meet $20 for a week, it will not be paid but can be accumulated to the next week</p>
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
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="text-purple-600" size={36} />
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
                <a href="#home" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Home</a>
                <a href="#about" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">About Us</a>
                <a href="#tilo-agency" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Tilo Agency</a>
                <a href="#tilo-streamer" className="block text-gray-400 hover:text-purple-400 transition-colors text-sm">Tilo Streamer</a>
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
              Developed & Maintained By <a href="https://usafe.in" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 font-semibold">Urbanesafe LLP</a>
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
