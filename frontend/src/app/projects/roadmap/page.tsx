import Link from 'next/link';
import { getSiteContent, pickJSON } from '@/lib/site-content';

export const metadata = {
  title: 'Innovation Pipeline & Roadmap | Alpha Power Station',
  description: 'Explore our strategic roadmap of current projects and future initiatives driving African infrastructure innovation.',
};

interface RoadmapProject {
  title: string;
  type: string;
  description: string;
  progress: number;
}

interface RoadmapQuarter {
  quarter: string;
  status: string;
  projects: RoadmapProject[];
}

const DEFAULT_TIMELINE: RoadmapQuarter[] = [
  {
    quarter: 'Q2 2026',
    status: 'Current',
    projects: [
      { title: 'Smart Prepaid Meter - Phase 2', type: 'Commercial', description: 'Scaling deployment to 10,000 units across 5 regions', progress: 60 },
    ],
  },
];

export default async function RoadmapPage() {
  const content = await getSiteContent('roadmap');
  const timeline = pickJSON<RoadmapQuarter[]>(content, 'roadmap.quarters', DEFAULT_TIMELINE);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Innovation Pipeline</h1>
            <p className="text-xl text-gray-200">
              Our strategic roadmap for transforming West African infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Focus Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Strategic Focus Areas</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🔋</div>
                <h3 className="text-xl font-bold mb-3">Energy Systems</h3>
                <p className="text-gray-600">
                  Smart metering, renewable energy integration, and grid management solutions
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🌐</div>
                <h3 className="text-xl font-bold mb-3">IoT & Connectivity</h3>
                <p className="text-gray-600">
                  Cloud platforms, monitoring systems, and data analytics for infrastructure
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="text-5xl mb-4">♻️</div>
                <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  E-waste upcycling, circular economy, and environmentally-conscious engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Project Timeline</h2>
            
            <div className="space-y-12">
              {timeline.map((period, periodIndex) => (
                <div key={periodIndex}>
                  <div className="flex items-center mb-6">
                    <div className={`px-6 py-3 rounded-lg font-bold text-lg ${
                      period.status === 'Current' ? 'bg-green-600 text-white' :
                      period.status === 'Planned' ? 'bg-blue-600 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {period.quarter}
                    </div>
                    <div className="ml-4 text-gray-600 font-semibold">{period.status}</div>
                  </div>
                  
                  <div className="space-y-4 pl-4 border-l-4 border-gray-300">
                    {period.projects.map((project, projectIndex) => (
                      <div key={projectIndex} className="bg-white rounded-lg p-6 shadow-md ml-8">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              project.type === 'Commercial' ? 'bg-blue-100 text-blue-800' :
                              project.type === 'Infrastructure' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {project.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{project.progress}%</div>
                            <div className="text-xs text-gray-500">Progress</div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Research Priorities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Research & Development Priorities</h2>
            
            <div className="space-y-6">
              <div className="bg-white border-l-4 border-blue-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Africa-Proof Component Library</h3>
                <p className="text-gray-700">
                  Building a standardized library of tested, Africa-proof components and reference designs 
                  for faster project deployment and knowledge sharing across teams.
                </p>
              </div>
              
              <div className="bg-white border-l-4 border-green-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Local Manufacturing Partnerships</h3>
                <p className="text-gray-700">
                  Establishing relationships with local PCB fabricators and assembly houses to reduce 
                  import dependency and shorten production cycles.
                </p>
              </div>
              
              <div className="bg-white border-l-4 border-purple-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Standards & Certification</h3>
                <p className="text-gray-700">
                  Working with regulatory bodies (GSA, Energy Commission) to ensure our solutions meet 
                  national and international standards for market deployment.
                </p>
              </div>
              
              <div className="bg-white border-l-4 border-orange-600 p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2">Training & Documentation</h3>
                <p className="text-gray-700">
                  Creating comprehensive training materials and documentation to support local technicians 
                  in maintaining and repairing our systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Be Part of Our Innovation Journey
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our team and contribute to projects shaping Africa's infrastructure future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/student-programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Student Programs
            </Link>
            <Link
              href="/partnerships"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Partner with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
