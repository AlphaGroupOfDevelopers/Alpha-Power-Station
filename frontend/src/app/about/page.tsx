import Link from 'next/link';
import { FaShieldAlt, FaTools, FaBolt, FaWrench, FaGlobeAfrica, FaDollarSign, FaBullseye, FaSeedling, FaHandshake, FaBookOpen, FaLightbulb } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import VideoHero from '@/components/VideoHero';
import { getSiteContent, pick } from '@/lib/site-content';

export const metadata = {
  title: 'About Us | Alpha Power Station',
  description: 'Learn about our vision, mission, Africa-Proof Engineering philosophy, organizational structure, and values.',
};

export default async function AboutPage() {
  const content = await getSiteContent('about');

  return (
    <div className="bg-white">
      {/* Hero Section with Video Background */}
      <VideoHero 
        videoSrc="/The Engineering that Runs the Digital World 🛠️⚙️💻 How do CPUs Work_.mp4"
        overlayOpacity={60}
      >
        <section className="text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">About Alpha Power Station</h1>
              <p className="text-xl text-gray-200">
                Building West Africa's premier integrated engineering and technology hub
              </p>
            </div>
          </div>
        </section>
      </VideoHero>

      {/* Vision & Mission - WRD Section 4.2 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Vision</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {pick(
                    content,
                    'about.vision',
                    'To become the premier integrated engineering and technology hub in West Africa, pioneering locally designed, climate-resilient, and commercially viable systems that solve critical infrastructure challenges across the continent.'
                  )}
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4 text-blue-900">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {pick(
                    content,
                    'about.mission',
                    'To develop and deploy Africa-Proof Engineering solutions through the seamless integration of software and hardware expertise, fostering innovation, sustainability, and local economic development while training the next generation of African engineers.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy: Africa-Proof Engineering - WRD Section 4.2 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Philosophy: Africa-Proof Engineering</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Our core design philosophy ensuring every solution is rugged, repairable, serviceable, 
              tolerant of unstable power, heat, dust, and supply-chain constraints
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-blue-600 mb-3">
                  <FaShieldAlt className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Rugged Design</h3>
                <p className="text-gray-600">
                  Built to withstand harsh environmental conditions—extreme heat, dust, and humidity.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-orange-600 mb-3">
                  <FaTools className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Repairable</h3>
                <p className="text-gray-600">
                  Designed for easy maintenance and repair using locally available tools and skills.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-yellow-600 mb-3">
                  <FaBolt className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Power-Resilient</h3>
                <p className="text-gray-600">
                  Tolerant of unstable power grids, voltage fluctuations, and frequent outages.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-gray-600 mb-3">
                  <FaWrench className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Serviceable</h3>
                <p className="text-gray-600">
                  Components can be serviced and replaced without specialized imported equipment.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-green-600 mb-3">
                  <FaGlobeAfrica className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Supply-Chain Adapted</h3>
                <p className="text-gray-600">
                  Designed around locally available materials and components when possible.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-teal-600 mb-3">
                  <FaDollarSign className="text-4xl" />
                </div>
                <h3 className="font-bold text-lg mb-2">Commercially Viable</h3>
                <p className="text-gray-600">
                  Sustainable business models that make solutions affordable and scalable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Structure - WRD Section 4.2 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Integrated Structure</h2>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Alpha Power Station brings together two divisions—Alpha Group of Developers (AGD) 
              and Alpha Group of Electronics & Electricals (AGEE)—creating unique value through 
              seamless hardware-software integration.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* AGD */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  Alpha Group of Developers (AGD)
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Focus:</strong> Software Development & Embedded Systems
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Firmware and embedded software development</li>
                  <li>• IoT and connectivity solutions</li>
                  <li>• Web and mobile applications</li>
                  <li>• Data analytics and monitoring systems</li>
                  <li>• DLMS/COSEM protocol implementation</li>
                </ul>
              </div>

              {/* AGEE */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-900">
                  Alpha Group of Electronics & Electricals (AGEE)
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>Focus:</strong> Hardware Engineering & Power Systems
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>• Power electronics and energy metering</li>
                  <li>• PCB design and prototyping</li>
                  <li>• Renewable energy systems integration</li>
                  <li>• E-waste upcycling and component recovery</li>
                  <li>• Electrical testing and certification</li>
                </ul>
              </div>
            </div>

            {/* Integration Explanation */}
            <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">How Integration Creates Value</h3>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
                Our unique value comes from the seamless integration of AGD's software expertise 
                with AGEE's hardware capabilities. This hybrid 4-stage workflow—ideation, hardware 
                prototyping, software/firmware integration, and field testing—enables us to deliver 
                complete, tested solutions faster than traditional approaches.
              </p>
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                  <div className="font-semibold">Ideation</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">2</div>
                  <div className="font-semibold">Hardware Prototyping</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">3</div>
                  <div className="font-semibold">Software Integration</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">4</div>
                  <div className="font-semibold">Field Testing</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story/History - WRD Section 4.2 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              {pick(
                content,
                'about.story',
                "Alpha Power Station emerged from a simple observation: West Africa's infrastructure challenges require more than imported solutions.\n\nToday, Alpha Power Station stands as a testament to what African engineering can achieve: innovative, sustainable, and impactful solutions that don't just work here—they thrive here."
              )
                .split('\n\n')
                .map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values - WRD Section 4.2 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              The guiding principles that underpin our culture and work ethic
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="text-blue-600 flex-shrink-0">
                  <FaBullseye className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Excellence in Engineering</h3>
                  <p className="text-gray-600">
                    We hold ourselves to the highest technical and professional standards in every project.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-green-600 flex-shrink-0">
                  <FaSeedling className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Sustainability First</h3>
                  <p className="text-gray-600">
                    Environmental responsibility and long-term viability guide our design choices.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-purple-600 flex-shrink-0">
                  <FaHandshake className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Collaboration & Integration</h3>
                  <p className="text-gray-600">
                    We believe the best solutions emerge from diverse teams working seamlessly together.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-indigo-600 flex-shrink-0">
                  <FaBookOpen className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Continuous Learning</h3>
                  <p className="text-gray-600">
                    We foster a culture of curiosity, experimentation, and knowledge sharing.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-orange-600 flex-shrink-0">
                  <FaGlobeAfrica className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">African Context</h3>
                  <p className="text-gray-600">
                    Every solution is designed with African realities, resources, and potential in mind.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-yellow-600 flex-shrink-0">
                  <FaLightbulb className="text-4xl" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Innovation with Impact</h3>
                  <p className="text-gray-600">
                    We measure success not just by technical innovation, but by real-world impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Us in Building the Future
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of a team that's redefining engineering for Africa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/student-programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
            >
              <IoRocketSharp className="text-2xl" />
              Student Programs
            </Link>
            <Link
              href="/partnerships"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <FaHandshake className="text-2xl" />
              Partnership Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
