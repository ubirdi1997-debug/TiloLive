import Navigation from '@/components/Navigation';

export default function RulesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
            <span className="text-primary-600">TiloLive</span> Guidelines & Rules
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional standards and policies for a successful working environment
          </p>

          {/* General Rules */}
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-600 pb-2">
              General Work Rules
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-primary-600 font-bold text-xl mr-4">1.</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Professional Conduct</h3>
                  <p className="text-gray-600">
                    All employees must maintain professional behavior and treat colleagues, clients, 
                    and partners with respect at all times.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 font-bold text-xl mr-4">2.</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Punctuality & Attendance</h3>
                  <p className="text-gray-600">
                    Employees are expected to be punctual and maintain regular attendance. 
                    Any absences must be communicated in advance through proper channels.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 font-bold text-xl mr-4">3.</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Confidentiality</h3>
                  <p className="text-gray-600">
                    All company information, client data, and internal communications are strictly 
                    confidential and must not be shared outside the organization.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 font-bold text-xl mr-4">4.</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Quality Standards</h3>
                  <p className="text-gray-600">
                    All work must meet TiloLive's quality standards. Employees should strive for 
                    excellence in their deliverables and seek continuous improvement.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-primary-600 font-bold text-xl mr-4">5.</span>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Communication</h3>
                  <p className="text-gray-600">
                    Maintain clear and timely communication with team members, supervisors, and clients. 
                    Respond to emails and messages within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Code of Conduct */}
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-600 pb-2">
              Code of Conduct
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-primary-600 pl-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">✓ Do's</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Treat everyone with respect and dignity</li>
                  <li>• Report issues or concerns promptly</li>
                  <li>• Follow company policies and procedures</li>
                  <li>• Maintain a clean and organized workspace</li>
                  <li>• Participate in team meetings and training</li>
                  <li>• Represent the company professionally</li>
                </ul>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">✗ Don'ts</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Engage in harassment or discrimination</li>
                  <li>• Share confidential information</li>
                  <li>• Use company resources for personal gain</li>
                  <li>• Miss deadlines without prior notice</li>
                  <li>• Work under the influence of substances</li>
                  <li>• Engage in conflicts of interest</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Leave Policy */}
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-600 pb-2">
              Leave & Time Off Policy
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-primary-50">
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Leave Type</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Entitlement</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">Notice Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium">Annual Leave</td>
                    <td className="px-6 py-4 text-gray-600">15-25 days per year</td>
                    <td className="px-6 py-4 text-gray-600">2 weeks in advance</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Sick Leave</td>
                    <td className="px-6 py-4 text-gray-600">10 days per year</td>
                    <td className="px-6 py-4 text-gray-600">Same day notification</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Personal Leave</td>
                    <td className="px-6 py-4 text-gray-600">5 days per year</td>
                    <td className="px-6 py-4 text-gray-600">1 week in advance</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium">Emergency Leave</td>
                    <td className="px-6 py-4 text-gray-600">As needed</td>
                    <td className="px-6 py-4 text-gray-600">Immediate notification</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Performance & Disciplinary */}
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-600 pb-2">
              Performance & Disciplinary Actions
            </h2>
            <div className="space-y-4">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Performance Reviews</h3>
                <p className="text-gray-600">
                  Conducted quarterly to assess progress, provide feedback, and set goals. 
                  Annual reviews determine promotions and salary adjustments.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-lg mb-2">Warning System</h3>
                <p className="text-gray-600 mb-2">Progressive disciplinary actions:</p>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Verbal Warning - For minor infractions</li>
                  <li>Written Warning - Documented violation</li>
                  <li>Final Warning - Last chance before termination</li>
                  <li>Termination - For serious or repeated violations</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Technology & Security */}
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-primary-600 pb-2">
              Technology & Security Guidelines
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-3 text-primary-600">Data Security</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use strong passwords and change regularly</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Lock devices when not in use</li>
                  <li>• Report security incidents immediately</li>
                  <li>• Don't share login credentials</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3 text-primary-600">Equipment Usage</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Company devices for work purposes only</li>
                  <li>• No personal software installation</li>
                  <li>• Report damaged equipment promptly</li>
                  <li>• Return all equipment upon leaving</li>
                  <li>• Follow IT department guidelines</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact HR */}
          <div className="bg-primary-600 text-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
            <p className="mb-6">
              Our HR team is here to help clarify any rules or policies. Don't hesitate to reach out.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact HR Department
            </a>
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
