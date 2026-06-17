import Link from 'next/link';
import { FaTools, FaGraduationCap, FaLink, FaGlobeAfrica, FaBriefcase, FaUsers, FaArrowRight, FaCheckCircle, FaLaptopCode, FaBolt, FaFlask } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import VideoHero from '@/components/VideoHero';

export const metadata = {
  title: 'Student Programs & Careers | Alpha Power Station',
  description: 'Join Alpha Power Station and gain hands-on experience building real engineering solutions that transform West African infrastructure.',
};

export default function StudentProgramsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section with Video Background */}
      <VideoHero 
        videoSrc="/Electrical and Electronic engineering.mp4"
        overlayOpacity={50}
      >
        <section className="text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Build the Future with Us
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Join a team of passionate engineers creating transformative solutions for West Africa
              </p>
              <Link
                href="/student-programs/apply"
                className="inline-flex items-center justify-center gap-3 bg-yellow-400 text-blue-900 px-10 py-5 rounded-lg font-bold text-xl hover:bg-yellow-300 transition transform hover:scale-105"
              >
                <IoRocketSharp className="text-2xl" />
                Apply Now
              </Link>
            </div>
          </div>
        </section>
      </VideoHero>

      {/* Why Join - WRD Section 4.5 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Why Join Alpha Power Station?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-blue-600 mb-4">
                  <FaTools className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Hands-On Experience</h3>
                <p className="text-gray-700">
                  Work on real projects from day one. No coffee runs—you'll be designing circuits, 
                  writing firmware, and deploying systems that impact thousands of people.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-green-600 mb-4">
                  <FaGraduationCap className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">World-Class Mentorship</h3>
                <p className="text-gray-700">
                  Learn directly from experienced engineers. Weekly code reviews, design critiques, 
                  and one-on-one sessions with our leadership team.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-purple-600 mb-4">
                  <FaLink className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Full-Stack Learning</h3>
                <p className="text-gray-700">
                  Whether you're in AGD or AGEE, you'll learn both hardware and software. 
                  Our integrated approach means you understand the complete system.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-orange-600 mb-4">
                  <FaGlobeAfrica className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Real Impact</h3>
                <p className="text-gray-700">
                  See your work deployed in the field. Your code runs on meters serving communities. 
                  Your circuits power real infrastructure.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-red-600 mb-4">
                  <FaBriefcase className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Career Development</h3>
                <p className="text-gray-700">
                  Build a portfolio of real projects. Get recommendations. Top performers 
                  receive job offers or research opportunities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-lg hover:shadow-lg transition">
                <div className="text-yellow-600 mb-4">
                  <FaUsers className="text-5xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community & Network</h3>
                <p className="text-gray-700">
                  Join a tight-knit community of ambitious engineers. Alumni network across 
                  tech companies and graduate programs worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs/Tracks - WRD Section 4.5 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Programs</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* AGD Track */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
                <div className="bg-blue-600 text-white px-8 py-6 flex items-center gap-3">
                  <FaLaptopCode className="text-3xl" />
                  <div>
                    <h3 className="text-2xl font-bold">AGD Track</h3>
                    <p className="text-blue-100">Software & Embedded Systems</p>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-lg mb-4">What You'll Learn:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Embedded C/C++ on ARM microcontrollers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>RTOS (FreeRTOS) and real-time programming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>IoT protocols (MQTT, CoAP, DLMS/COSEM)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Cloud platforms and data analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>Web/mobile app development (React, React Native)</span>
                    </li>
                  </ul>

                  <h4 className="font-bold text-lg mb-4">Typical Projects:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>→ Firmware for energy meters</li>
                    <li>→ Cloud monitoring dashboards</li>
                    <li>→ Mobile apps for field technicians</li>
                    <li>→ Protocol implementation and testing</li>
                  </ul>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm">
                    <strong>Duration:</strong> 6-12 months (flexible)
                    <br />
                    <strong>Commitment:</strong> 20-40 hours/week
                  </div>
                </div>
              </div>

              {/* AGEE Track */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
                <div className="bg-green-600 text-white px-8 py-6 flex items-center gap-3">
                  <FaBolt className="text-3xl" />
                  <div>
                    <h3 className="text-2xl font-bold">AGEE Track</h3>
                    <p className="text-green-100">Hardware & Power Systems</p>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-bold text-lg mb-4">What You'll Learn:</h4>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>PCB design (KiCad, Altium Designer)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Power electronics and energy metering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Renewable energy systems (solar, batteries)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>Testing and compliance (IEC standards)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>E-waste upcycling and component recovery</span>
                    </li>
                  </ul>

                  <h4 className="font-bold text-lg mb-4">Typical Projects:</h4>
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li>→ Power supply circuit design</li>
                    <li>→ Energy measurement systems</li>
                    <li>→ Solar charge controllers</li>
                    <li>→ PCB prototyping and testing</li>
                  </ul>

                  <div className="bg-green-50 p-4 rounded-lg text-sm">
                    <strong>Duration:</strong> 6-12 months (flexible)
                    <br />
                    <strong>Commitment:</strong> 20-40 hours/week
                  </div>
                </div>
              </div>
            </div>

            {/* Research Assistantships */}
            <div className="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg p-8 flex items-start gap-4">
              <FaFlask className="text-4xl text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Research Assistantships</h3>
                <p className="text-gray-700 mb-4">
                  For advanced students interested in deep research. Work on cutting-edge problems 
                  in Africa-Proof Engineering, e-waste upcycling, or renewable energy integration. 
                  Opportunity for co-authoring papers and conference presentations.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Requirements:</strong> Strong academic record, previous research experience preferred
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process - WRD Section 4.5 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Application Process</h2>
            
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Submit Application</h3>
                  <p className="text-gray-700 mb-2">
                    Complete our online application form. Include your resume, cover letter, 
                    and any relevant project portfolios or GitHub links.
                  </p>
                  <p className="text-sm text-gray-600">Timeline: 15-30 minutes</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Technical Assessment</h3>
                  <p className="text-gray-700 mb-2">
                    Complete a take-home technical challenge relevant to your chosen track 
                    (AGD or AGEE). Demonstrates your problem-solving approach.
                  </p>
                  <p className="text-sm text-gray-600">Timeline: 3-5 days to complete</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Interview</h3>
                  <p className="text-gray-700 mb-2">
                    Video interview with our technical team. We'll discuss your background, 
                    interests, and technical assessment. Opportunity to ask questions.
                  </p>
                  <p className="text-sm text-gray-600">Timeline: 45-60 minutes</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                    <FaCheckCircle />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Decision & Onboarding</h3>
                  <p className="text-gray-700 mb-2">
                    Receive decision within 1 week. Accepted students begin onboarding with 
                    orientation, mentor assignment, and first project briefing.
                  </p>
                  <p className="text-sm text-gray-600">Timeline: 1-2 weeks</p>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <h4 className="font-bold mb-2">Eligibility Criteria</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Currently enrolled in or recently graduated from university (any discipline)</li>
                <li>• Strong interest in engineering and technology</li>
                <li>• Demonstrated problem-solving ability (coursework, projects, or competitions)</li>
                <li>• Commitment to learning and contributing to team projects</li>
                <li>• Available for minimum 6-month engagement</li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/student-programs/apply"
                className="inline-block bg-blue-900 text-white px-12 py-5 rounded-lg font-bold text-xl hover:bg-blue-800 transition"
              >
                Start Your Application
              </Link>
              <p className="mt-4 text-gray-600">
                Questions? Check our <Link href="/student-programs/faq" className="text-blue-600 hover:underline">FAQ</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - WRD Section 4.5 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Student Voices</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 mx-auto">
                    KM
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "In 6 months at Alpha, I learned more than in 3 years of university. I shipped 
                  firmware that's running on 5,000+ meters. That's incredible."
                </p>
                <div className="text-center">
                  <div className="font-bold">Kofi Mensah</div>
                  <div className="text-sm text-gray-600">AGD • Now at Google</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 mx-auto">
                    AN
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "The mentorship is unmatched. I had weekly 1-on-1s with the Head of Power Systems. 
                  Now I'm pursuing my PhD in renewable energy."
                </p>
                <div className="text-center">
                  <div className="font-bold">Amina Nkrumah</div>
                  <div className="text-sm text-gray-600">AGEE • PhD Student, MIT</div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3 mx-auto">
                    EO
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">
                  "I came for the technology, but stayed for the mission. Knowing my work impacts 
                  real communities is what gets me up every morning."
                </p>
                <div className="text-center">
                  <div className="font-bold">Emmanuel Osei</div>
                  <div className="text-sm text-gray-600">AGD/AGEE • Currently at Alpha</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-2xl mb-10 max-w-3xl mx-auto">
            Join the next generation of African engineers building solutions that matter
          </p>
          <Link
            href="/student-programs/apply"
            className="inline-block bg-yellow-400 text-blue-900 px-16 py-6 rounded-lg font-bold text-2xl hover:bg-yellow-300 transition transform hover:scale-105 shadow-2xl"
          >
            Apply Now →
          </Link>
          <p className="mt-6 text-gray-300">
            Applications reviewed on a rolling basis
          </p>
        </div>
      </section>
    </div>
  );
}
