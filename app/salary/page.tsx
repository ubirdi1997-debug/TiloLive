'use client';

import { useState } from 'react';
import content from '@/data/content.json';

export default function SalaryPage() {
  const { salary } = content;
  const [diamonds, setDiamonds] = useState('');
  const [calculatedUSD, setCalculatedUSD] = useState('');

  const calculateSalary = (diamondValue: string) => {
    const diamondNum = parseInt(diamondValue);
    if (isNaN(diamondNum) || diamondNum < 0) {
      setCalculatedUSD('');
      return;
    }

    // Simple conversion rate (adjust as needed)
    const conversionRate = 0.01; // $0.01 per diamond
    const usd = (diamondNum * conversionRate).toFixed(2);
    setCalculatedUSD(usd);
  };

  const handleDiamondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiamonds(value);
    calculateSalary(value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      {/* Header Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {salary.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {salary.description}
          </p>
        </div>
      </section>

      {/* Salary Table Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Level</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Target Diamonds</th>
                  <th className="px-6 py-4 text-left text-lg font-semibold">Monthly Salary</th>
                </tr>
              </thead>
              <tbody>
                {salary.tiers.map((tier, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-100 hover:bg-sky-50 transition-colors ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700">
                        {tier.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">{tier.diamonds}</td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
                        {tier.salary}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {salary.tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border border-sky-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-700">
                    {tier.level}
                  </span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
                    {tier.salary}
                  </span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">Target: </span>
                  {tier.diamonds} diamonds
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currency Calculator Section */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-sky-100">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Diamond Calculator
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Calculate your potential earnings based on diamonds
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Diamonds
                </label>
                <input
                  type="number"
                  value={diamonds}
                  onChange={handleDiamondChange}
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                />
              </div>
              
              {calculatedUSD && (
                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Estimated Value</p>
                  <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
                    ${calculatedUSD}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    * Approximate conversion rate
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
