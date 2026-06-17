import Link from 'next/link';
import { FaRocket, FaHandshake, FaWrench, FaRecycle, FaLink, FaArrowRight, FaQuoteLeft, FaBolt, FaLeaf, FaSolarPanel } from 'react-icons/fa';
import { HiLightningBolt } from 'react-icons/hi';
import { IoRocketSharp } from 'react-icons/io5';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  // Array of hero background images - 5 images will auto-slide
  const heroImages = [
    '/images/hero.jpg',
    '/images/hero 2.jpg',
    '/images/hero 3.webp',
    '/images/hero 4.jpg',
    '/images/hero 5.jpg',
  ];
  return (
    <>
      {/* Hero Section */}
      <HeroCarousel images={heroImages} interval={5000}>
        <section className="relative text-white">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Building the Future of
                <span className="block text-yellow-400 mt-2">Africa-Proof Engineering</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Premier integrated engineering and technology hub in West Africa.
                Solving critical infrastructure challenges through locally designed,
                climate-resilient, commercially viable systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/student-programs/apply"
                  className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
                >
                  <IoRocketSharp className="text-2xl" />
                  Apply Now
                </Link>
                <Link
                  href="/partnerships"
                  className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
                >
                  <FaHandshake className="text-2xl" />
                  Partner with Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </HeroCarousel>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Integrated Engineering Excellence
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Alpha Power Station unites two powerful divisions: <strong>Alpha Group of Developers (AGD)</strong> for 
              cutting-edge software and embedded systems, and <strong>Alpha Group of Electronics & Electricals (AGEE)</strong> for 
              innovative hardware engineering. Together, we create integrated solutions that transform West Africa's 
              infrastructure landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Key Value Propositions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-blue-600 mb-4">
                <FaWrench className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Africa-Proof Engineering</h3>
              <p className="text-gray-600">
                Rugged, repairable systems designed to thrive in challenging conditions—
                unstable power, extreme heat, dust, and supply-chain constraints.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-green-600 mb-4">
                <FaRecycle className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">E-Waste Upcycling</h3>
              <p className="text-gray-600">
                Building sustainable supply chains by recovering and repurposing electronic 
                components, reducing environmental impact while fostering local innovation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition">
              <div className="text-orange-600 mb-4">
                <FaLink className="text-5xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrated Solutions</h3>
              <p className="text-gray-600">
                Seamless hardware-software integration through our hybrid 4-stage workflow:
                ideation, prototyping, integration, and field testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600">
              Innovative solutions addressing real-world challenges
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="border rounded-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <FaBolt className="text-white text-7xl opacity-30" />
              </div>
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">COMMERCIAL • INTEGRATED</div>
                <h3 className="text-xl font-bold mb-3">Smart Prepaid Meter System</h3>
                <p className="text-gray-600 mb-4">
                  IEC 62055-41 compliant smart prepaid electricity meter with DLMS/COSEM protocol 
                  support for West African power distribution networks.
                </p>
                <Link href="/projects" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1">
                  Learn More <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border rounded-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                <FaRecycle className="text-white text-7xl opacity-30" />
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-2">FOUNDATIONAL • AGEE</div>
                <h3 className="text-xl font-bold mb-3">E-Waste Upcycling Initiative</h3>
                <p className="text-gray-600 mb-4">
                  Systematic approach to recovering electronic components from e-waste, 
                  building locally sustainable supply chains.
                </p>
                <Link href="/projects" className="text-green-600 font-semibold hover:underline inline-flex items-center gap-1">
                  Learn More <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border rounded-lg overflow-hidden hover:shadow-xl transition">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                <FaSolarPanel className="text-white text-7xl opacity-30" />
              </div>
              <div className="p-6">
                <div className="text-sm text-orange-600 font-semibold mb-2">INFRASTRUCTURE • INTEGRATED</div>
                <h3 className="text-xl font-bold mb-3">Hybrid Solar Microgrid</h3>
                <p className="text-gray-600 mb-4">
                  Advanced microgrid management combining solar PV, battery storage, and grid backup 
                  with intelligent load management.
                </p>
                <Link href="/projects" className="text-orange-600 font-semibold hover:underline inline-flex items-center gap-1">
                  Learn More <FaArrowRight className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Explore All Projects <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Student Voices
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaQuoteLeft className="text-3xl text-blue-600 mb-4" />
              <p className="text-gray-700 italic mb-4">
                "Alpha Power Station gave me hands-on experience with real infrastructure projects. 
                I'm not just learning theory—I'm building solutions that impact thousands of people."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  KM
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Kofi Mensah</div>
                  <div className="text-sm text-gray-600">Software Engineering Intern, AGD</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <FaQuoteLeft className="text-3xl text-green-600 mb-4" />
              <p className="text-gray-700 italic mb-4">
                "The Africa-Proof Engineering philosophy changed how I think about design. 
                Here, we don't just copy solutions—we create systems that truly work for our context."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  AN
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Amina Nkrumah</div>
                  <div className="text-sm text-gray-600">Hardware Engineering Intern, AGEE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join a team of passionate engineers building transformative solutions for West Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/student-programs/apply"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
            >
              <IoRocketSharp className="text-2xl" />
              Start Your Application
            </Link>
            <Link
              href="/about"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              Learn More About Us <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
