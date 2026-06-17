import Link from 'next/link';
import { FaUserTie, FaBolt, FaMicrochip, FaFlask, FaChartLine, FaCode, FaServer, FaMobile, FaNetworkWired, FaTools, FaDraftingCompass, FaSolarPanel, FaCheckCircle, FaUsers, FaLaptopCode, FaCog } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { GiElectric } from 'react-icons/gi';

export const metadata = {
  title: 'Our Team | Alpha Power Station',
  description: 'Meet the leadership, team structure, and talented students driving innovation at Alpha Power Station.',
};

export default function TeamPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-gray-200">
              The people behind Africa's engineering transformation
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership - WRD Section 4.3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Executive Leadership</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Our leadership team brings together deep technical expertise, strategic vision, and 
              commitment to African engineering excellence.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* President & Chief Engineer */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  <FaUserTie />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Chief Engineer</h3>
                <p className="text-center text-blue-600 font-semibold mb-4">President & Chief Engineer</p>
                <p className="text-gray-600 text-sm">
                  Leading Alpha Power Station with expertise in systems architecture, embedded engineering, 
                  and strategic vision for integrated engineering solutions across West Africa.
                </p>
              </div>

              {/* Head of Power Systems */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition">
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  <GiElectric />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Power Systems Lead</h3>
                <p className="text-center text-green-600 font-semibold mb-4">Head of Power Systems (AGEE)</p>
                <p className="text-gray-600 text-sm">
                  Specializing in power electronics, renewable energy systems, grid integration, and 
                  electrical engineering standards compliance for African infrastructure.
                </p>
              </div>

              {/* Head of Embedded Systems */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  <FaMicrochip />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Embedded Systems Lead</h3>
                <p className="text-center text-purple-600 font-semibold mb-4">Head of Embedded Systems (AGD)</p>
                <p className="text-gray-600 text-sm">
                  Expert in firmware development, real-time systems, IoT device design, and protocol 
                  implementation for smart infrastructure applications.
                </p>
              </div>

              {/* Head of R&D and Sourcing */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  <FaFlask />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">R&D Lead</h3>
                <p className="text-center text-orange-600 font-semibold mb-4">Head of R&D and Sourcing</p>
                <p className="text-gray-600 text-sm">
                  Driving innovation through research initiatives, e-waste upcycling programs, and 
                  establishing sustainable supply chains for local component sourcing.
                </p>
              </div>

              {/* Operations and Finance Lead */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto">
                  <FaChartLine />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Operations Lead</h3>
                <p className="text-center text-red-600 font-semibold mb-4">Operations and Finance Lead</p>
                <p className="text-gray-600 text-sm">
                  Managing business operations, financial sustainability, partnerships, and ensuring 
                  scalable growth of Alpha Power Station's initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Structure - WRD Section 4.3 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Team Structure</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Our collaborative environment spans two integrated divisions working seamlessly together
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* AGD Teams */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                    AGD
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Alpha Group of Developers</h3>
                    <p className="text-gray-600">Software & Embedded Teams</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-600 pl-4 flex items-start gap-3">
                    <FaMicrochip className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Embedded Systems Team</h4>
                      <p className="text-sm text-gray-600">Firmware, RTOS, microcontroller programming</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4 flex items-start gap-3">
                    <FaNetworkWired className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">IoT & Connectivity Team</h4>
                      <p className="text-sm text-gray-600">Cloud platforms, data pipelines, MQTT/CoAP</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4 flex items-start gap-3">
                    <FaMobile className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Web & Mobile Team</h4>
                      <p className="text-sm text-gray-600">Frontend, backend, mobile applications</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-blue-600 pl-4 flex items-start gap-3">
                    <FaServer className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Protocol Implementation Team</h4>
                      <p className="text-sm text-gray-600">DLMS/COSEM, Modbus, communication stacks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AGEE Teams */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                    AGEE
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Alpha Group of Electronics & Electricals</h3>
                    <p className="text-gray-600">Hardware & Power Teams</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-green-600 pl-4 flex items-start gap-3">
                    <FaBolt className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Power Electronics Team</h4>
                      <p className="text-sm text-gray-600">Metering, energy measurement, MPPT design</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4 flex items-start gap-3">
                    <FaDraftingCompass className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">PCB Design Team</h4>
                      <p className="text-sm text-gray-600">Circuit design, layout, prototyping</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4 flex items-start gap-3">
                    <FaSolarPanel className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Renewable Energy Team</h4>
                      <p className="text-sm text-gray-600">Solar systems, battery management, microgrids</p>
                    </div>
                  </div>
                  <div className="border-l-4 border-green-600 pl-4 flex items-start gap-3">
                    <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">Testing & Certification Team</h4>
                      <p className="text-sm text-gray-600">IEC compliance, safety testing, field validation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cross-Functional Collaboration */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-lg p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaUsers className="text-3xl text-purple-600" />
                <h3 className="text-2xl font-bold">Cross-Functional Collaboration</h3>
              </div>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Teams from both divisions work together daily in integrated project squads, 
                ensuring seamless hardware-software development through our 4-stage workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Spotlights - WRD Section 4.3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Student Spotlights</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Meet some of the talented students contributing to real-world engineering projects
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Student 1 */}
              <div className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold">
                    KM
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Kofi Mensah</h3>
                  <p className="text-blue-600 font-semibold mb-3">Software Engineering Intern</p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Division:</strong> AGD
                  </p>
                  <p className="text-gray-700 mb-4">
                    Working on DLMS/COSEM protocol implementation for smart meters and cloud 
                    monitoring dashboards. Previously contributed to firmware optimization.
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Learning:</strong> Embedded systems, IoT protocols, cloud integration
                  </div>
                </div>
              </div>

              {/* Student 2 */}
              <div className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-green-600 text-4xl font-bold">
                    AN
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Amina Nkrumah</h3>
                  <p className="text-green-600 font-semibold mb-3">Hardware Engineering Intern</p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Division:</strong> AGEE
                  </p>
                  <p className="text-gray-700 mb-4">
                    Designing power electronics circuits for renewable energy systems and 
                    leading the e-waste component recovery testing protocols.
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Learning:</strong> Power electronics, PCB design, energy metering
                  </div>
                </div>
              </div>

              {/* Student 3 */}
              <div className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-purple-600 text-4xl font-bold">
                    EO
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Emmanuel Osei</h3>
                  <p className="text-purple-600 font-semibold mb-3">Full-Stack Engineering Intern</p>
                  <p className="text-sm text-gray-600 mb-3">
                    <strong>Division:</strong> AGD & AGEE (Integrated)
                  </p>
                  <p className="text-gray-700 mb-4">
                    Building monitoring dashboards for microgrid systems while learning hardware 
                    integration. Bridge between software and hardware teams.
                  </p>
                  <div className="text-sm text-gray-600">
                    <strong>Learning:</strong> Full-stack development, hardware-software integration
                  </div>
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
            Join Our Team
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Work alongside experienced engineers and talented students building the future of African infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/student-programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
            >
              <FaLaptopCode className="text-2xl" />
              Explore Student Programs
            </Link>
            <Link
              href="/student-programs/apply"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <IoRocketSharp className="text-2xl" />
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
