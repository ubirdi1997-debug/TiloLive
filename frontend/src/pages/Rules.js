import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CheckCircle, AlertTriangle, Shield } from 'lucide-react';

const Rules = () => {
  const rules = [
    {
      category: 'Account & Profile',
      icon: Shield,
      color: 'text-sky-500',
      items: [
        { title: 'Profile Verification', content: 'Complete profile verification within 24 hours of registration. Provide accurate personal information and valid government-issued identification.' },
        { title: 'Profile Picture Guidelines', content: 'Use a clear, professional profile picture. Pictures must show your face clearly. Inappropriate or misleading images will result in account suspension.' },
        { title: 'Account Security', content: 'Keep your login credentials confidential. You are responsible for all activities under your account. Report suspicious activity immediately.' },
      ]
    },
    {
      category: 'Content Standards',
      icon: CheckCircle,
      color: 'text-green-500',
      items: [
        { title: 'Professional Conduct', content: 'Maintain professional behavior during all calls. Use appropriate language and treat all users with respect and courtesy.' },
        { title: 'Prohibited Content', content: 'Strictly prohibited: Nudity, violence, hate speech, illegal activities, harassment, or discriminatory content. Violations result in immediate termination.' },
        { title: 'Language Requirements', content: 'Communicate clearly in supported languages. Ensure audio quality is acceptable. Background noise should be minimized during calls.' },
      ]
    },
    {
      category: 'Call Requirements',
      icon: AlertTriangle,
      color: 'text-orange-500',
      items: [
        { title: 'Minimum Call Duration', content: 'Complete minimum 2 minutes per call to qualify for earnings. Early disconnections may affect your ratings and tier status.' },
        { title: 'Response Time', content: 'Accept incoming calls within 30 seconds. Maintain a minimum 70% acceptance rate to avoid penalties and maintain your tier level.' },
        { title: 'Availability Commitment', content: 'Honor your scheduled availability slots. Provide at least 4 hours notice for schedule changes. Frequent no-shows may result in suspension.' },
        { title: 'Peak Hour Bonuses', content: 'Be available during peak hours (8 PM - 12 AM) to earn additional bonuses. Peak hour attendance tracked for performance evaluation.' },
      ]
    },
    {
      category: 'Performance Standards',
      icon: CheckCircle,
      color: 'text-purple-500',
      items: [
        { title: 'Rating Maintenance', content: 'Maintain a minimum 4.0 star rating (out of 5) to retain your current tier. Ratings below 3.5 may result in demotion or account review.' },
        { title: 'Monthly Target', content: 'Achieve tier-specific monthly targets to maintain or upgrade your level. Targets reset on the 1st of each month. Track progress in your dashboard.' },
        { title: 'Quality Monitoring', content: 'Random quality checks may be conducted. Ensure compliance with all guidelines during monitored calls. Feedback provided for improvement.' },
      ]
    },
    {
      category: 'Payment & Earnings',
      icon: CheckCircle,
      color: 'text-cyan-500',
      items: [
        { title: 'Salary Calculation', content: 'Salaries calculated based on verified diamonds, completed calls, and performance metrics. Reports available by the 3rd of each month.' },
        { title: 'Withdrawal Process', content: 'Minimum withdrawal threshold: ₹2,000. Withdrawals processed within 5-7 business days. Ensure bank details are accurate and verified.' },
        { title: 'Bonus Eligibility', content: 'New host bonuses valid for first 48 hours only. Performance bonuses require 90% attendance and 4.5+ rating. Terms apply.' },
        { title: 'Diamond Conversion', content: 'Diamond-to-cash ratio: 1 diamond = ₹2. Rates subject to change with 7 days notice. Special rates available during promotional periods.' },
      ]
    },
    {
      category: 'Agent-Specific Rules',
      icon: Shield,
      color: 'text-blue-500',
      items: [
        { title: 'Host Recruitment', content: 'Recruit genuine, quality hosts who meet platform standards. You are responsible for initial training and guideline orientation of your team.' },
        { title: 'Team Management', content: 'Monitor your team performance regularly. Provide support and guidance to improve host ratings. Low-performing hosts may affect your commission.' },
        { title: 'Commission Calculation', content: 'Commissions calculated on your active team total earnings. Paid monthly after host payouts are processed. Detailed breakdowns provided.' },
        { title: 'Team Size Verification', content: 'Active hosts defined as those completing minimum 10 hours monthly. Inactive hosts not counted toward tier calculation.' },
      ]
    },
    {
      category: 'Penalties & Violations',
      icon: AlertTriangle,
      color: 'text-red-500',
      items: [
        { title: 'Warning System', content: 'First violation: Written warning. Second violation: 7-day suspension. Third violation: Permanent account termination. No exceptions for major violations.' },
        { title: 'Tier Demotion', content: 'Failure to meet monthly targets results in tier demotion. Multiple demotions may result in account probation. Consistent improvement rewarded.' },
        { title: 'Appeal Process', content: 'Penalty appeals must be submitted within 7 days via official channels. Include relevant evidence and documentation. Decision final after review.' },
      ]
    },
    {
      category: 'Platform Guidelines',
      icon: Shield,
      color: 'text-indigo-500',
      items: [
        { title: 'Terms Updates', content: 'Platform reserves the right to update terms and conditions. Users notified 7 days before implementation. Continued use implies acceptance.' },
        { title: 'Technical Requirements', content: 'Stable internet connection required (minimum 2 Mbps). Compatible devices: Android 8+, iOS 13+. Update app regularly for best performance.' },
        { title: 'Support Access', content: 'Contact support for assistance via in-app chat, email, or WhatsApp. Response time: 24-48 hours. Emergency escalations available.' },
        { title: 'Dispute Resolution', content: 'All disputes subject to arbitration. Jurisdiction: Location of platform headquarters. Legal proceedings as per applicable laws.' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="rules-page">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="rules-page-title">
              Platform <span className="text-gradient">Rules & Guidelines</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow these professional standards to maintain your account status, maximize earnings, and ensure a positive experience for all users.
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle className="text-sky-500" size={20} />
              Important Notice
            </h3>
            <p className="text-sm text-gray-600">
              All users must comply with these guidelines. Violations may result in warnings, account suspension, or termination. For questions, contact our support team.
            </p>
          </div>

          {rules.map((section, index) => (
            <div key={index} className="mb-8" data-testid={`rules-category-${section.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-white p-3 rounded-xl shadow-sm">
                  <section.icon className={section.color} size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {section.category}
                </h2>
              </div>

              <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm border border-gray-200">
                {section.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`} data-testid={`rule-item-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <AccordionTrigger className="px-6 hover:no-underline">
                      <span className="font-semibold text-left">{item.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="mt-12 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Questions About Our Guidelines?</h3>
            <p className="mb-6 text-white/90">Our support team is here to help clarify any rules or requirements.</p>
            <a href="/contact" className="inline-block bg-white text-sky-500 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all" data-testid="contact-support-button">
              Contact Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rules;
