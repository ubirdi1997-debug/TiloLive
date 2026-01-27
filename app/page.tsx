import Link from 'next/link';
import content from '@/data/content.json';

type Feature = {
  icon: string;
  title: string;
  description: string;
};

type Section = {
  title: string;
  features?: Feature[];
  content?: string;
};

export default function Home() {
  const { home } = content;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {home.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Join as Host
              </Link>
              <Link
                href="/contact"
                className="border-2 border-sky-500 text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-sky-50 transition-all"
              >
                Join as Agent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {(home.sections as Section[]).map((section, index) => (
        <section key={index} className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              {section.title}
            </h2>
            
            {section.features && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-sky-100"
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {section.content && (
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-600 leading-relaxed text-center">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-500 to-cyan-500 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful hosts and agents on TiloLive today.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-sky-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  );
}
