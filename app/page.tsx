import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary-600">TiloLive</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your premier agency platform for professional services and solutions
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/salary"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                View Salary Info
              </a>
              <a
                href="/contact"
                className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-primary-600 text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Professional Services</h3>
              <p className="text-gray-600">
                Top-tier agency services tailored to your needs with experienced professionals.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-primary-600 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Competitive Salary</h3>
              <p className="text-gray-600">
                Transparent salary structure with competitive rates and benefits for all positions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-primary-600 text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3">Clear Guidelines</h3>
              <p className="text-gray-600">
                Well-defined rules and policies to ensure smooth operations and fair treatment.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About TiloLive</h2>
              <p className="text-gray-600 mb-4">
                TiloLive is a modern agency platform committed to providing exceptional services
                and creating opportunities for talented professionals. We believe in transparency,
                fair compensation, and maintaining the highest standards in everything we do.
              </p>
              <p className="text-gray-600">
                Our platform connects businesses with skilled professionals, offering a seamless
                experience backed by clear policies and competitive compensation packages.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 TiloLive. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
