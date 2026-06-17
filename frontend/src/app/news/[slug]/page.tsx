import Link from 'next/link';

// In production, this would fetch from the backend API based on slug
// For now, we'll use a sample article structure

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Sample article data (would come from API)
const sampleArticle = {
  title: 'Alpha Power Station Reaches 1,000 Smart Meter Deployment Milestone',
  category: 'Projects',
  date: '2026-06-10',
  author: {
    name: 'Dr. Emmanuel Kwesi',
    role: 'Chief Engineer & President',
    avatar: 'EK',
  },
  readTime: '8 min read',
  image: 'gradient-blue',
  content: [
    {
      type: 'paragraph',
      text: 'In a significant achievement for locally designed energy solutions in West Africa, Alpha Power Station has successfully deployed its 1,000th IEC 62055-41 compliant smart prepaid electricity meter across communities in Ghana, Nigeria, and Senegal. This milestone represents not just a number, but a fundamental shift in how energy access and billing transparency are addressed in the region.',
    },
    {
      type: 'heading',
      text: 'The Africa-Proof Difference',
    },
    {
      type: 'paragraph',
      text: 'Unlike imported smart meters that often fail in West African conditions, our meters are designed from the ground up with Africa-Proof Engineering principles. Each unit is built to withstand unstable power grids, extreme heat, dust, and the supply-chain constraints that plague conventional solutions.',
    },
    {
      type: 'list',
      items: [
        'Rugged construction with passive thermal management (no fans to fail)',
        'Wide input voltage range (90-280V AC) to handle grid fluctuations',
        'Local component sourcing through our e-waste upcycling initiative',
        'Field-serviceable design with common tools and parts',
        'DLMS/COSEM protocol support for utility integration',
      ],
    },
    {
      type: 'heading',
      text: 'Real Impact on Communities',
    },
    {
      type: 'paragraph',
      text: 'The deployment has transformed billing accuracy and reduced revenue losses for utility companies while providing consumers with transparent, prepaid energy management. In pilot communities, we\'ve observed:',
    },
    {
      type: 'stats',
      items: [
        { label: 'Reduction in billing disputes', value: '78%' },
        { label: 'Improvement in collection rates', value: '92%' },
        { label: 'Customer satisfaction rating', value: '4.6/5' },
      ],
    },
    {
      type: 'quote',
      text: 'These meters work where others fail. The difference is clear—they\'re designed for our reality, not imported from countries with stable power grids.',
      author: 'Kwame Nkrumah, Distribution Engineer, ECG',
    },
    {
      type: 'heading',
      text: 'Student-Led Innovation',
    },
    {
      type: 'paragraph',
      text: 'This achievement showcases the power of student involvement in real-world engineering projects. Over 40 students from our AGD and AGEE divisions contributed to various aspects of the smart meter project—from firmware development to field installation.',
    },
    {
      type: 'paragraph',
      text: 'Kofi Mensah, a software engineering intern, developed the real-time monitoring dashboard that utilities use to track meter performance across thousands of installations. "Working on infrastructure that affects thousands of people daily is incredibly motivating," says Kofi. "This isn\'t academic theory—it\'s real engineering that matters."',
    },
    {
      type: 'heading',
      text: 'Looking Ahead: Next 10,000 Meters',
    },
    {
      type: 'paragraph',
      text: 'With the 1,000-meter milestone behind us, we\'re accelerating production to reach 10,000 deployments by Q2 2027. This scale-up will include:',
    },
    {
      type: 'list',
      items: [
        'Expanded manufacturing capacity at our Accra facility',
        'Integration with mobile money platforms for seamless recharging',
        'Advanced analytics for predictive maintenance',
        'Training programs for local utility technicians',
      ],
    },
    {
      type: 'paragraph',
      text: 'This is just the beginning. Our vision is to make Alpha Power Station the premier provider of climate-resilient, locally designed energy infrastructure across West Africa—and prove that African engineering can compete globally when given the opportunity.',
    },
  ],
  relatedArticles: [
    {
      slug: 'africa-proof-engineering-philosophy',
      title: 'What is Africa-Proof Engineering? Our Design Philosophy Explained',
      category: 'Thought Leadership',
    },
    {
      slug: 'student-spotlight-kofi-mensah',
      title: 'Student Spotlight: How Kofi Mensah Built a Real-Time Grid Monitoring System',
      category: 'Student Stories',
    },
  ],
};

export default function ArticlePage({ params }: ArticlePageProps) {
  // In production, fetch article data based on params.slug
  const article = sampleArticle;

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
        <div className={`h-96 bg-gradient-to-br ${
          article.image === 'gradient-blue' ? 'from-blue-500 to-blue-700' :
          article.image === 'gradient-green' ? 'from-green-500 to-green-700' :
          'from-gray-500 to-gray-700'
        }`}></div>

        {/* Article Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Meta Information */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                {article.category}
              </span>
              <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center mb-8 pb-8 border-b">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {article.author.avatar}
              </div>
              <div className="ml-4">
                <div className="font-semibold text-lg">{article.author.name}</div>
                <div className="text-gray-600">{article.author.role}</div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {article.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-gray-700 leading-relaxed mb-6">
                        {block.text}
                      </p>
                    );
                  
                  case 'heading':
                    return (
                      <h2 key={index} className="text-3xl font-bold mt-12 mb-4">
                        {block.text}
                      </h2>
                    );
                  
                  case 'list':
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                        {block.items?.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );
                  
                  case 'stats':
                    return (
                      <div key={index} className="grid md:grid-cols-3 gap-6 my-8 bg-gray-50 p-8 rounded-lg">
                        {block.items?.map((stat, i) => (
                          <div key={i} className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                              {stat.value}
                            </div>
                            <div className="text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    );
                  
                  case 'quote':
                    return (
                      <blockquote key={index} className="border-l-4 border-blue-600 pl-6 my-8 italic text-xl text-gray-700">
                        <p className="mb-2">&ldquo;{block.text}&rdquo;</p>
                        {block.author && (
                          <footer className="text-sm text-gray-600 not-italic">
                            — {block.author}
                          </footer>
                        )}
                      </blockquote>
                    );
                  
                  default:
                    return null;
                }
              })}
            </div>

            {/* Share & Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Share this article</h3>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Twitter
                    </button>
                    <button className="bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition">
                      LinkedIn
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
                      Email
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Topics</h3>
                  <div className="flex gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Smart Meters</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Projects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {article.relatedArticles.map((related) => (
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

// Generate static params for all blog posts (in production)
export async function generateStaticParams() {
  // In production, fetch all article slugs from the API
  return [
    { slug: 'smart-meter-deployment-milestone' },
    { slug: 'africa-proof-engineering-philosophy' },
    { slug: 'student-spotlight-kofi-mensah' },
    { slug: 'partnership-atu-incubator' },
    { slug: 'e-waste-upcycling-impact' },
    { slug: 'hybrid-microgrid-case-study' },
  ];
}
