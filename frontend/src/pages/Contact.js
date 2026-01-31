import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="contact-page">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="contact-page-title">
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="card-hover bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center" data-testid="contact-info-whatsapp">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-green-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 text-sm mb-3">Quick responses via WhatsApp</p>
              <a href="https://wa.me/918266941716" className="text-sky-500 font-semibold hover:text-sky-600">+91 82669 41716</a>
            </div>

            <div className="card-hover bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center" data-testid="contact-info-email">
              <div className="bg-sky-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-sky-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Send us an email anytime</p>
              <a href="mailto:info@tilolive.in" className="text-sky-500 font-semibold hover:text-sky-600">info@tilolive.in</a>
            </div>

            <div className="card-hover bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center" data-testid="contact-info-phone">
              <div className="bg-cyan-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-cyan-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 text-sm mb-3">Give us a call</p>
              <a href="tel:+918266941716" className="text-sky-500 font-semibold hover:text-sky-600">+91 82669 41716</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24-48 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    data-testid="contact-name-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                    data-testid="contact-email-input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                    data-testid="contact-phone-input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    placeholder="How can we help?"
                    data-testid="contact-subject-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                  placeholder="Tell us more about your inquiry..."
                  data-testid="contact-message-input"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit-button"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
