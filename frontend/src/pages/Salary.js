import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Gem, Phone, Users } from 'lucide-react';

const Salary = () => {
  const hostSalary = [
    { level: 'Bronze', diamonds: '0 - 5,000', earning: '₹5,000 - ₹15,000', icon: Gem, color: 'from-orange-400 to-orange-600' },
    { level: 'Silver', diamonds: '5,001 - 15,000', earning: '₹15,000 - ₹35,000', icon: Gem, color: 'from-gray-400 to-gray-600' },
    { level: 'Gold', diamonds: '15,001 - 30,000', earning: '₹35,000 - ₹60,000', icon: Gem, color: 'from-yellow-400 to-yellow-600' },
    { level: 'Platinum', diamonds: '30,001 - 50,000', earning: '₹60,000 - ₹1,00,000', icon: Gem, color: 'from-sky-400 to-sky-600' },
    { level: 'Diamond', diamonds: '50,001+', earning: '₹1,00,000+', icon: Gem, color: 'from-purple-400 to-purple-600' },
  ];

  const agentTiers = [
    { tier: 'Starter Agent', hosts: '1-5 Hosts', commission: '8%', bonus: '₹2,000', color: 'from-green-400 to-green-600' },
    { tier: 'Growth Agent', hosts: '6-15 Hosts', commission: '10%', bonus: '₹5,000', color: 'from-blue-400 to-blue-600' },
    { tier: 'Pro Agent', hosts: '16-30 Hosts', commission: '12%', bonus: '₹10,000', color: 'from-purple-400 to-purple-600' },
    { tier: 'Elite Agent', hosts: '31+ Hosts', commission: '15%', bonus: '₹20,000', color: 'from-pink-400 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="salary-page">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }} data-testid="salary-page-title">
              Transparent <span className="text-gradient">Salary Structure</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our compensation model rewards performance, dedication, and growth. Choose your path and start earning today.
            </p>
          </div>

          {/* Host Salary Cards */}
          <section className="mb-20" data-testid="host-salary-section">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Phone className="text-sky-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Host Salary Tiers</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostSalary.map((tier, index) => (
                <div key={index} className="card-hover bg-white rounded-2xl p-8 border border-gray-200 shadow-lg" data-testid={`host-tier-${tier.level.toLowerCase()}`}>
                  <div className={`bg-gradient-to-r ${tier.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <tier.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{tier.level}</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Diamonds Range</p>
                      <p className="text-lg font-semibold text-gray-900">{tier.diamonds}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Monthly Earning</p>
                      <p className="text-xl font-bold text-gradient">{tier.earning}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-sky-50 border border-sky-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Host Earning Formula</h3>
              <p className="text-gray-600 text-sm mb-2">Base Earnings = (Total Diamonds × Diamond Rate) + Call Bonuses</p>
              <p className="text-gray-600 text-sm">Additional bonuses apply for consistent performance and peak hour availability</p>
            </div>
          </section>

          {/* Agent Commission Cards */}
          <section data-testid="agent-salary-section">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Users className="text-cyan-500" size={32} />
              <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Agent Commission Structure</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {agentTiers.map((tier, index) => (
                <div key={index} className="card-hover bg-white rounded-2xl p-8 border border-gray-200 shadow-lg" data-testid={`agent-tier-${tier.tier.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className={`bg-gradient-to-r ${tier.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                    <Users className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{tier.tier}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Active Hosts:</span>
                      <span className="font-semibold text-gray-900">{tier.hosts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Commission:</span>
                      <span className="text-xl font-bold text-gradient">{tier.commission}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Monthly Bonus:</span>
                      <span className="font-semibold text-green-600">{tier.bonus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-cyan-50 border border-cyan-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Agent Earning Formula</h3>
              <p className="text-gray-600 text-sm mb-2">Monthly Earnings = (Total Host Earnings × Commission Rate) + Performance Bonus</p>
              <p className="text-gray-600 text-sm">Bonuses increase with team size and overall host performance metrics</p>
            </div>
          </section>

          {/* Payment Info */}
          <section className="mt-16 bg-white rounded-2xl p-8 shadow-lg" data-testid="payment-info-section">
            <h3 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>Payment Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-sky-100 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Secure Payouts</h4>
                    <p className="text-sm text-gray-600">All payments processed through secure Epay system with bank transfer options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Flexible Withdrawal</h4>
                    <p className="text-sm text-gray-600">Convert diamonds to cash anytime with minimum threshold requirements</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Monthly Reports</h4>
                    <p className="text-sm text-gray-600">Detailed salary breakdowns available on the 1st of every month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">No Hidden Fees</h4>
                    <p className="text-sm text-gray-600">Transparent pricing with zero hidden charges or deductions</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Salary;
