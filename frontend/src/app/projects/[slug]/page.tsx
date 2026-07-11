import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft, FaBolt, FaLaptopCode, FaClipboardList, FaTrophy } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';

interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  division: string;
  status: string;
  imageUrl: string | null;
  technicalDetails: string | null;
  methodology: string | null;
  results: string | null;
  challenges: string | null;
  gallery: string[];
}

async function getProject(slug: string): Promise<Project | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/projects/${slug}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Link href="/projects" className="text-gray-200 hover:text-white inline-flex items-center gap-2">
                <FaArrowLeft /> Back to Projects
              </Link>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {project.category}
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-semibold uppercase">
                {project.division}
              </span>
              <span className="bg-green-500 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {project.status}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-xl text-gray-200">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {project.imageUrl && (
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="max-w-4xl mx-auto rounded-lg shadow-2xl w-full object-cover max-h-96"
          />
        </div>
      )}

      {/* Challenges */}
      {project.challenges && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-8">Challenges Addressed</h2>
              <ReactMarkdown>{project.challenges}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Technical Details */}
      {project.technicalDetails && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaBolt className="text-orange-600" />
                Technical Details
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-md prose prose-lg max-w-none">
                <ReactMarkdown>{project.technicalDetails}</ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Methodology */}
      {project.methodology && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaLaptopCode className="text-blue-600" />
                Development Methodology
              </h2>
              <ReactMarkdown>{project.methodology}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {project.results && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaTrophy className="text-yellow-500" />
                Results & Impact
              </h2>
              <div className="bg-white rounded-lg p-8 shadow-md prose prose-lg max-w-none">
                <ReactMarkdown>{project.results}</ReactMarkdown>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <FaClipboardList className="text-purple-600" />
                Gallery
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.gallery.map((url) => (
                  <img key={url} src={url} alt={project.title} className="rounded-lg shadow-md w-full object-cover h-64" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
