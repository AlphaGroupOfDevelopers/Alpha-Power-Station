import Link from 'next/link';
import { getSiteContent, pickJSON } from '@/lib/site-content';

export const metadata = {
  title: 'FAQ - Student Programs | Alpha Power Station',
  description: 'Frequently asked questions about Alpha Power Station student programs, application process, and opportunities.',
};

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const DEFAULT_FAQS: FAQCategory[] = [
  {
    category: 'Application Process',
    questions: [
      { q: 'Who is eligible to apply?', a: 'We accept applications from current university students (any year) and recent graduates (within 1 year).' },
    ],
  },
];

export default async function FAQPage() {
  const content = await getSiteContent('faq');
  const faqs = pickJSON<FAQCategory[]>(content, 'faq.items', DEFAULT_FAQS);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-200">
              Everything you need to know about our student programs
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-700 mb-4">
              Jump to section:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {faqs.map((section, index) => (
                <a
                  key={index}
                  href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition"
                >
                  {section.category}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex} id={section.category.toLowerCase().replace(/\s+/g, '-')}>
                <h2 className="text-3xl font-bold mb-8">{section.category}</h2>
                <div className="space-y-6">
                  {section.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
                      <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.q}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-lg text-gray-700 mb-8">
              We're here to help! Reach out and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:applications@alphapowerstation.org"
                className="px-8 py-4 bg-blue-900 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Email Us
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Form
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Apply?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait—start your application today
          </p>
          <Link
            href="/student-programs/apply"
            className="inline-block bg-yellow-400 text-blue-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition"
          >
            Start Application →
          </Link>
        </div>
      </section>
    </div>
  );
}
