import Link from 'next/link';
import { FaLaptopCode, FaBolt, FaLink, FaArrowRight, FaFilter, FaRocket } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

export const metadata = {
  title: 'Projects | Alpha Power Station',
  description: 'Explore our portfolio of innovative engineering projects solving critical infrastructure challenges across West Africa.',
};

interface Project {
  slug: string;
  title: string;
  category: string;
  division: string;
  status: string;
  description: string;
  imageUrl: string | null;
  results: string | null;
}

const GRADIENTS = [
  { gradient: 'from-blue-500 to-blue-700', color: 'blue' },
  { gradient: 'from-green-500 to-green-700', color: 'green' },
  { gradient: 'from-orange-500 to-orange-700', color: 'orange' },
  { gradient: 'from-purple-500 to-purple-700', color: 'purple' },
  { gradient: 'from-red-500 to-red-700', color: 'red' },
  { gradient: 'from-yellow-500 to-yellow-700', color: 'yellow' },
];

async function getProjects(): Promise<Project[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/projects`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

const categories = ['All', 'foundational', 'commercial', 'infrastructure'];
const divisions = ['All', 'AGD', 'AGEE', 'integrated'];

export default async function ProjectsPage() {
  const projects = await getProjects();

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
            {projects.length === 0 ? (
              <p className="text-center text-gray-500">
                Projects will appear here once added from the admin dashboard.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => {
                  const { gradient, color } = GRADIENTS[index % GRADIENTS.length];
                  return (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group"
                    >
                      <div className="border rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                        {/* Project Image/Gradient */}
                        {project.imageUrl ? (
                          <img src={project.imageUrl} alt={project.title} className="h-48 w-full object-cover" />
                        ) : (
                          <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            <div className="text-white text-center z-10">
                              {project.division === 'AGD' && <FaLaptopCode className="text-7xl opacity-30" />}
                              {project.division === 'AGEE' && <FaBolt className="text-7xl opacity-30" />}
                              {project.division === 'integrated' && <FaLink className="text-7xl opacity-30" />}
                            </div>
                          </div>
                        )}

                        {/* Project Info */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-${color}-100 text-${color}-800 capitalize`}>
                              {project.category}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
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
                                <strong>Status:</strong>
                              </span>
                              <span className={`font-semibold px-2 py-1 rounded text-xs capitalize ${
                                project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            {project.results && (
                              <p className="text-xs text-gray-600 mt-2">{project.results}</p>
                            )}
                          </div>

                          <div className="mt-4 text-blue-600 font-semibold text-sm group-hover:underline inline-flex items-center gap-1">
                            View Details <FaArrowRight className="text-xs" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
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
