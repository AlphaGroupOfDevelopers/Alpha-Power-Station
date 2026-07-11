import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: string;
  author: string;
  tags: string[];
  publishedAt: string | null;
}

async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/news/${slug}`, { next: { revalidate: 60 } });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getRelatedPosts(category: string, excludeSlug: string): Promise<NewsPost[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/news?category=${encodeURIComponent(category)}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const posts: NewsPost[] = await response.json();
    return posts.filter((post) => post.slug !== excludeSlug).slice(0, 2);
  } catch {
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getNewsPost(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedPosts(article.category, article.slug);

  return (
    <>
      {/* Article Header */}
      <article className="bg-white">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              {' / '}
              <Link href="/news" className="hover:text-blue-600">News & Insights</Link>
              {' / '}
              <span className="text-gray-900">{article.category}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="h-96 w-full object-cover" />
        ) : (
          <div className="h-96 bg-gradient-to-br from-blue-500 to-blue-700"></div>
        )}

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {article.category}
              </span>
              {article.publishedAt && (
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center mb-8 pb-8 border-b">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {article.author.charAt(0)}
              </div>
              <div className="ml-4">
                <div className="font-semibold text-lg">{article.author}</div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Topics</h3>
                <div className="flex gap-2 flex-wrap">
                  {article.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <div key={related.slug} className="bg-white border rounded-lg p-6 hover:shadow-lg transition">
                    <div className="text-sm text-blue-600 font-semibold mb-2">
                      {related.category}
                    </div>
                    <h3 className="text-xl font-bold mb-3">
                      <Link href={`/news/${related.slug}`} className="hover:text-blue-600 transition">
                        {related.title}
                      </Link>
                    </h3>
                    <Link
                      href={`/news/${related.slug}`}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Read Article →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Be Part of the Innovation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our team of student engineers building transformative solutions for West Africa.
          </p>
          <Link
            href="/student-programs/apply"
            className="inline-block bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Apply to Join Our Team
          </Link>
        </div>
      </section>
    </>
  );
}
