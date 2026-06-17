import Link from 'next/link';
import { FaLaptopCode, FaBolt, FaLink, FaArrowRight, FaFilter, FaRocket } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

export const metadata = {
  title: 'Projects | Alpha Power Station',
  description: 'Explore our portfolio of innovative engineering projects solving critical infrastructure challenges across West Africa.',
};

export default function ProjectsPage() {
  // Project data - in production this would come from the backend API
  const projects = [
    {
      id: 'smart-prepaid-meter',
      title: 'Smart Prepaid Meter System',
      category: 'Commercial',
      division: 'Integrated',
      status: 'Active',
      description: 'IEC 62055-41 compliant smart prepaid electricity meter with DLMS/COSEM protocol support, designed for West African power distribution networks.',
      impact: 'Deployed in pilot programs serving 5,000+ households',
      gradient: 'from-blue-500 to-blue-700',
      color: 'blue',
    },
    {
      id: 'e-waste-upcycling',
      title: 'E-Waste Upcycling Initiative',
      category: 'Foundational',
      division: 'AGEE',
      status: 'Active',
      description: 'Systematic approach to recovering and repurposing electronic components from e-waste, building locally sustainable supply chains.',
      impact: 'Recovered 10,000+ components, reducing costs by 30%',
      gradient: 'from-green-500 to-green-700',
      color: 'green',
    },
    {
      id: 'hybrid-solar-microgrid',
      title: 'Hybrid Solar Microgrid Controller',
      category: 'Infrastructure',
      division: 'Integrated',
      status: 'Planning',
      description: 'Advanced microgrid management system combining solar PV, battery storage, and grid backup with intelligent load management.',
      impact: 'Targeting 50kW installations for commercial use',
      gradient: 'from-orange-500 to-orange-700',
      color: 'orange',
    },
    {
      id: 'iot-monitoring-platform',
      title: 'IoT Monitoring Platform',
      category: 'Commercial',
      division: 'AGD',
      status: 'Active',
      description: 'Cloud-based real-time monitoring and analytics platform for distributed energy systems with mobile app integration.',
      impact: 'Monitoring 200+ devices across 3 countries',
      gradient: 'from-purple-500 to-purple-700',
      color: 'purple',
    },
    {
      id: 'power-quality-analyzer',
      title: 'Power Quality Analyzer',
      category: 'Commercial',
      division: 'AGEE',
      status: 'Active',
      description: 'Portable power quality monitoring device for assessing grid stability and identifying electrical anomalies in field conditions.',
      impact: 'Used in 50+ grid assessments',
      gradient: 'from-red-500 to-red-700',
      color: 'red',
    },
    {
      id: 'smart-street-lighting',
      title: 'Smart Street Lighting System',
      category: 'Infrastructure',
      division: 'Integrated',
      status: 'Planning',
      description: 'Energy-efficient LED street lighting with IoT control, solar backup, and adaptive brightness based on ambient conditions.',
      impact: 'Pilot phase targeting 100 light installations',
      gradient: 'from-yellow-500 to-yellow-700',
      color: 'yellow',
    },
  ];

  const categories = ['All', 'Foundational', 'Commercial', 'Infrastructure'];
  const divisions = ['All', 'AGD', 'AGEE', 'Integrated'];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Projects</h1>
            <p className="text-xl text-gray-200">
              Innovative solutions addressing real-world infrastructure challenges across West Africa
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Category Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        cat === 'All'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              {/* Division Filter */}
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-2 text-gray-700">Division</label>
                <div className="flex flex-wrap gap-2">
                  {divisions.map((div) => (
                    <button
                      key={div}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        div === 'All'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-600'
                      }`}
                    >
                      {div}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Portfolio - WRD Section 4.4 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group"
                >
                  <div className="border rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                    {/* Project Image/Gradient */}
                    <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                      <div className="text-white text-center z-10">
                        {project.division === 'AGD' && <FaLaptopCode className="text-7xl opacity-30" />}
                        {project.division === 'AGEE' && <FaBolt className="text-7xl opacity-30" />}
                        {project.division === 'Integrated' && <FaLink className="text-7xl opacity-30" />}
                      </div>
                    </div>
                    
                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-${project.color}-100 text-${project.color}-800`}>
                          {project.category}
                        </span>
                        <span className="text-xs font-semibold text-gray-500">
                          {project.division}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            <strong>Impact:</strong>
                          </span>
                          <span className={`font-semibold px-2 py-1 rounded text-xs ${
                            project.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-2">{project.impact}</p>
                      </div>
                      
                      <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:underline inline-flex items-center gap-1">
                        View Details <FaArrowRight className="text-xs" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Pipeline Link */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Innovation Pipeline</h2>
            <p className="text-lg text-gray-700 mb-8">
              Explore our roadmap of upcoming projects and strategic initiatives
            </p>
            <Link
              href="/projects/roadmap"
              className="inline-flex items-center gap-2 bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition"
            >
              View Project Roadmap <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Work on Impactful Projects
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our team and contribute to real engineering solutions transforming West Africa
          </p>
          <Link
            href="/student-programs"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition"
          >
            <IoRocketSharp className="text-2xl" />
            Explore Student Programs
          </Link>
        </div>
      </section>
    </div>
  );
}
