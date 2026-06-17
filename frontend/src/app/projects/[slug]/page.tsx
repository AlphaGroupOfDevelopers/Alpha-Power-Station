import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft, FaCheckCircle, FaBolt, FaLaptopCode, FaClipboardList, FaTrophy, FaArrowRight } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

// This would normally come from the backend API
const projectData: Record<string, any> = {
  'smart-prepaid-meter': {
    title: 'Smart Prepaid Meter System',
    category: 'Commercial',
    division: 'Integrated',
    status: 'Active',
    hero: 'from-blue-500 to-blue-700',
    overview: {
      description: 'A comprehensive smart metering solution compliant with IEC 62055-41 standards, featuring DLMS/COSEM protocol support and designed specifically for the challenging conditions of West African power distribution networks.',
      challenges: [
        'Unstable grid voltage (90V-270V AC)',
        'Frequent power outages',
        'High ambient temperatures (up to 50°C)',
        'Need for tamper detection',
        'Remote credit loading requirements',
      ],
      impact: [
        'Deployed in pilot programs serving 5,000+ households',
        'Reduced revenue losses by 35% through tamper detection',
        '99.8% uptime in field conditions',
        'Average response time < 200ms for credit validation',
      ],
    },
    technical: {
      hardware: [
        'STM32F4 microcontroller (ARM Cortex-M4)',
        'ADE7880 energy measurement IC (0.1% accuracy)',
        'Wide-range SMPS (90V-270V input)',
        'LCD display with backlight',
        'Relay control circuit (60A switching)',
        'Tamper detection sensors (magnetic, cover)',
        '4G LTE modem for connectivity',
      ],
      software: [
        'FreeRTOS-based firmware',
        'DLMS/COSEM protocol stack',
        'AES-128 encryption for security',
        'Over-the-air (OTA) update capability',
        'Local data logging (30-day buffer)',
        'Cloud sync with MQTT protocol',
      ],
      standards: [
        'IEC 62055-41 (Electricity metering - Payment systems)',
        'IEC 62056-21 (DLMS/COSEM)',
        'IEC 61000 (Electromagnetic compatibility)',
        'GSA (Ghana Standards Authority) certified',
      ],
    },
    methodology: {
      stages: [
        {
          title: 'Ideation',
          description: 'Joint AGD-AGEE workshops to define system architecture, select components, and plan integration points.',
          duration: '2 weeks',
        },
        {
          title: 'Hardware Prototyping',
          description: 'AGEE team designed PCBs, tested power circuits, and validated energy measurement accuracy.',
          duration: '6 weeks',
        },
        {
          title: 'Software Integration',
          description: 'AGD team developed firmware, implemented DLMS/COSEM stack, and integrated cloud connectivity.',
          duration: '8 weeks',
        },
        {
          title: 'Field Testing',
          description: 'Deployed 50 units in real-world conditions, collected performance data, iterated on design.',
          duration: '12 weeks',
        },
      ],
    },
    results: {
      metrics: [
        { label: 'Accuracy', value: '±0.5% (Class 1)' },
        { label: 'Operating Voltage', value: '90V - 270V AC' },
        { label: 'Max Current', value: '60A' },
        { label: 'Communication', value: '4G LTE / GPRS' },
        { label: 'Display', value: '128x64 LCD' },
        { label: 'Uptime', value: '99.8%' },
      ],
      achievements: [
        'First locally-designed smart meter in West Africa',
        'Cost 40% less than imported alternatives',
        'Designed for local repair and maintenance',
        'Pilot deployment successful across 3 regions',
      ],
    },
  },
};

export function generateStaticParams() {
  return [
    { slug: 'smart-prepaid-meter' },
    { slug: 'e-waste-upcycling' },
    { slug: 'hybrid-solar-microgrid' },
  ];
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${project.hero} text-white py-20`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/projects" className="text-gray-200 hover:text-white inline-flex items-center gap-2">
                <FaArrowLeft /> Back to Projects
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold">
                {project.division}
              </span>
              <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold">
                {project.status}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-gray-200">
              {project.overview.description}
            </p>
          </div>
        </div>
      </section>

      {/* Overview - WRD Section 4.4 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Project Overview</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Challenges Addressed</h3>
                <ul className="space-y-2">
                  {project.overview.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1"><FaCheckCircle /></span>
                      <span className="text-gray-700">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Impact & Results</h3>
                <ul className="space-y-2">
                  {project.overview.impact.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-1"><FaCheckCircle /></span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details - WRD Section 4.4 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Technical Details</h2>
            
            <div className="space-y-8">
              {/* Hardware */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaBolt className="text-2xl text-orange-600 mr-3" />
                  Hardware Components
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.technical.hardware.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5"><FaCheckCircle className="text-xs" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Software */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaLaptopCode className="text-2xl text-blue-600 mr-3" />
                  Software & Firmware
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {project.technical.software.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700 text-sm flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5"><FaCheckCircle className="text-xs" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Standards */}
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <FaClipboardList className="text-2xl text-purple-600 mr-3" />
                  Standards & Compliance
                </h3>
                <ul className="space-y-2">
                  {project.technical.standards.map((item: string, index: number) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span className="text-purple-600 mr-2 mt-0.5"><FaCheckCircle /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology - WRD Section 4.4 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Development Methodology</h2>
            <p className="text-lg text-gray-700 mb-8">
              Our hybrid 4-stage workflow ensures seamless hardware-software integration
            </p>
            
            <div className="space-y-6">
              {project.methodology.stages.map((stage: any, index: number) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{stage.title}</h3>
                    <p className="text-gray-700 mb-2">{stage.description}</p>
                    <span className="text-sm text-gray-500">Duration: {stage.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact - WRD Section 4.4 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Results & Impact</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {project.results.metrics.map((metric: any, index: number) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <div className="text-gray-600 font-semibold">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-xl font-bold mb-6">Key Achievements</h3>
              <ul className="space-y-3">
                {project.results.achievements.map((achievement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <FaTrophy className="text-2xl text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Interested in Similar Projects?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our team and work on cutting-edge engineering solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <FaArrowLeft />
              View All Projects
            </Link>
            <Link
              href="/student-programs/apply"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
            >
              <IoRocketSharp className="text-xl" />
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
