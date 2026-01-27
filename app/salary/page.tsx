import Navigation from '@/components/Navigation';

export default function SalaryPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            Salary Structure at <span className="text-primary-600">TiloLive</span>
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Transparent and competitive salary packages for all positions
          </p>

          {/* Staff Salary Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Staff Positions</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Base Salary
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Bonus Structure
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Benefits
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Senior Manager
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $8,000 - $12,000/month
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Performance-based up to 30%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Full package + Stock options
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Project Manager
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $5,000 - $8,000/month
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Performance-based up to 25%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Full package
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Team Leader
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $4,000 - $6,000/month
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Performance-based up to 20%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Health + Retirement
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Senior Agent
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $3,000 - $5,000/month
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Commission-based up to 15%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Health insurance
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Junior Agent
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      $2,000 - $3,500/month
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Commission-based up to 10%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Basic health coverage
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Additional Benefits Table */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Additional Benefits</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Benefit Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                      Eligibility
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Health Insurance
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Comprehensive medical, dental, and vision coverage
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      All full-time employees
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Paid Time Off
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      15-25 days annual leave based on tenure
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      All employees
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Training & Development
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Professional development courses and certifications
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      All employees
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Remote Work Options
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Flexible work arrangements and hybrid options
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      Based on position
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Retirement Plan
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      401(k) with company match up to 5%
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      After 6 months
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Performance Incentives */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Performance Incentives</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary-600">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Monthly Bonuses</h3>
                <p className="text-gray-600 mb-2">Based on individual performance metrics</p>
                <p className="text-2xl font-bold text-primary-600">Up to $1,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary-600">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Quarterly Awards</h3>
                <p className="text-gray-600 mb-2">For exceptional team contributions</p>
                <p className="text-2xl font-bold text-primary-600">Up to $3,000</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-primary-600">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Annual Bonus</h3>
                <p className="text-gray-600 mb-2">Company-wide profit sharing</p>
                <p className="text-2xl font-bold text-primary-600">Up to 2 months salary</p>
              </div>
            </div>
          </section>

          {/* Note Section */}
          <div className="mt-12 bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
            <p className="text-gray-700">
              <strong className="text-primary-700">Note:</strong> All salary ranges are subject to experience, 
              qualifications, and market conditions. Contact our HR department for specific details and 
              personalized salary discussions.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 TiloLive. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
