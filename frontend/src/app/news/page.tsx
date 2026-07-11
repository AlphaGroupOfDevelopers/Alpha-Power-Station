import Link from 'next/link';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowRight, FaEnvelope, FaTags } from 'react-icons/fa';
import { MdEventNote } from 'react-icons/md';

interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  coverImage: string | null;
  featured: boolean;
  publishedAt: string | null;
}

const GRADIENTS = [
  'from-blue-500 to-blue-700',
  'from-green-500 to-green-700',
  'from-orange-500 to-orange-700',
  'from-purple-500 to-purple-700',
  'from-teal-500 to-teal-700',
  'from-yellow-500 to-yellow-700',
];

async function getNewsPosts(): Promise<NewsPost[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/news`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

const upcomingEvents = [
  {
    title: 'Open House: Meet the Team & Tour Our Labs',
    date: '2026-07-15',
    time: '2:00 PM - 5:00 PM',
    location: 'Alpha Power Station HQ, Accra',
    type: 'Open House',
  },
  {
    title: 'Webinar: Getting Started with Africa-Proof Engineering',
    date: '2026-07-22',
    time: '6:00 PM - 7:30 PM',
    location: 'Virtual (Zoom)',
    type: 'Webinar',
  },
  {
    title: 'Student Application Workshop: Tips for Success',
    date: '2026-08-05',
    time: '4:00 PM - 6:00 PM',
    location: 'Virtual (Teams)',
    type: 'Workshop',
  },
];

const categories = ['All', 'Projects', 'Thought Leadership', 'Student Stories', 'Partnerships', 'Sustainability'];

export default async function NewsPage() {
  const newsArticles = await getNewsPosts();
  const featuredArticles = newsArticles.filter((article) => article.featured);
  const regularArticles = newsArticles.filter((article) => !article.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Insights
            </h1>
            <p className="text-xl text-gray-200">
              Stay updated with our latest projects, innovations, and thought leadership in Africa-Proof Engineering
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Articles */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    category === 'All'
                      ? 'bg-blue-900 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {newsArticles.length === 0 ? (
              <p className="text-gray-500 py-12 text-center">
                No news posts yet. Check back soon.
              </p>
            ) : (
              <>
                {/* Featured Articles */}
                {featuredArticles.map((article) => (
                  <div key={article.slug} className="mb-12 border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} className="h-64 w-full object-cover" />
                    ) : (
                      <div className={`h-64 bg-gradient-to-br ${GRADIENTS[0]}`}></div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                          Featured
                        </span>
                        <span className="text-blue-600 font-semibold">{article.category}</span>
                        {article.publishedAt && (
                          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        )}
                      </div>
                      <h2 className="text-3xl font-bold mb-4">
                        <Link href={`/news/${article.slug}`} className="hover:text-blue-600 transition">
                          {article.title}
                        </Link>
                      </h2>
                      <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          By <span className="font-semibold">{article.author}</span>
                        </div>
                        <Link
                          href={`/news/${article.slug}`}
                          className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          Read Full Article <FaArrowRight className="text-sm" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Regular Articles */}
                <div className="space-y-6">
                  {regularArticles.map((article, index) => (
                    <div key={article.slug} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                      <div className="md:flex">
                        {article.coverImage ? (
                          <img src={article.coverImage} alt={article.title} className="md:w-48 h-48 object-cover" />
                        ) : (
                          <div className={`md:w-48 h-48 bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}></div>
                        )}
                        <div className="p-6 flex-1">
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="text-blue-600 font-semibold">{article.category}</span>
                            {article.publishedAt && (
                              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            <Link href={`/news/${article.slug}`} className="hover:text-blue-600 transition">
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-gray-700 mb-3">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              By <span className="font-semibold">{article.author}</span>
                            </div>
                            <Link
                              href={`/news/${article.slug}`}
                              className="text-blue-600 font-semibold hover:underline text-sm inline-flex items-center gap-1"
                            >
                              Read More <FaArrowRight className="text-xs" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Upcoming Events */}
            <div className="bg-gray-50 border rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MdEventNote className="text-2xl text-blue-600" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="pb-4 border-b last:border-b-0">
                    <div className="text-xs text-gray-600 mb-1">{event.type}</div>
                    <h4 className="font-semibold mb-2">{event.title}</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-600" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-green-600" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-600" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                className="block mt-4 text-center bg-blue-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                View All Events
              </Link>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-blue-900 text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <FaEnvelope className="text-yellow-400" />
                Stay Updated
              </h3>
              <p className="text-sm mb-4">
                Get the latest news, project updates, and insights delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 rounded-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Popular Topics */}
            <div className="bg-gray-50 border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaTags className="text-purple-600" />
                Popular Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Smart Meters</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Sustainability</span>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Microgrids</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Student Stories</span>
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">E-Waste</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Partnerships</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
