import Link from 'next/link';

export const metadata = {
  title: 'FAQ - Student Programs | Alpha Power Station',
  description: 'Frequently asked questions about Alpha Power Station student programs, application process, and opportunities.',
};

export default function FAQPage() {
  const faqs = [
    {
      category: 'Application Process',
      questions: [
        {
          q: 'Who is eligible to apply?',
          a: 'We accept applications from current university students (any year) and recent graduates (within 1 year). All disciplines are welcome, though engineering and technology backgrounds are preferred. Most importantly, we look for passion, curiosity, and commitment to learning.',
        },
        {
          q: 'When should I apply?',
          a: 'Applications are reviewed on a rolling basis throughout the year. We have intake cohorts starting in January, April, July, and October. We recommend applying at least 6-8 weeks before your desired start date.',
        },
        {
          q: 'How long does the application process take?',
          a: 'From submission to decision typically takes 2-3 weeks. This includes the technical assessment (3-5 days), interview scheduling (1 week), and final decision (1 week). We move quickly to ensure you have enough time to plan.',
        },
        {
          q: 'What if I don\'t have prior experience?',
          a: 'Prior experience is helpful but not required. We look for strong fundamentals, problem-solving ability, and eagerness to learn. Many of our most successful students had limited experience when they joined. What matters is your attitude and commitment.',
        },
      ],
    },
    {
      category: 'Program Details',
      questions: [
        {
          q: 'How long is the program?',
          a: 'Programs are flexible, ranging from 6 to 12 months. We work with your academic schedule. Most students participate for 6-9 months, which provides enough time to complete meaningful projects and develop strong skills.',
        },
        {
          q: 'What is the time commitment?',
          a: 'We require a minimum of 20 hours per week. Most students commit 30-40 hours/week during semester breaks and 20-25 hours/week during term time. The program is intensive—this is not a casual internship.',
        },
        {
          q: 'Is this remote or in-person?',
          a: 'Currently, we operate primarily in-person at our facilities in West Africa. This allows for better hardware-software integration work, mentorship, and team collaboration. Some remote flexibility is available for exceptional circumstances.',
        },
        {
          q: 'Do I get paid?',
          a: 'Yes. We provide stipends to help cover living expenses. The amount varies based on your year of study, commitment level (part-time vs full-time), and performance. Top performers may receive performance bonuses and equipment stipends.',
        },
      ],
    },
    {
      category: 'Learning & Growth',
      questions: [
        {
          q: 'What will I actually work on?',
          a: 'Real projects, not toy problems. You might implement firmware for smart meters deployed to thousands of homes, design PCBs for renewable energy systems, build IoT platforms, or develop testing protocols. Your work has real impact from day one.',
        },
        {
          q: 'Will I get mentorship?',
          a: 'Absolutely. Each student is assigned a mentor from our technical leadership. You\'ll have weekly 1-on-1 meetings, regular code/design reviews, and access to the full team for questions. Learning is central to our culture.',
        },
        {
          q: 'Can I switch between AGD and AGEE?',
          a: 'Yes! We encourage cross-division learning. While you\'ll have a primary division (AGD or AGEE), you\'ll work on integrated projects and can participate in workshops and sessions from the other division.',
        },
        {
          q: 'What happens after the program?',
          a: 'Many outcomes: full-time job offers at Alpha or partner companies, funded graduate school opportunities, strong recommendation letters, and a portfolio of real projects. Our alumni network is strong—they help each other long after the program ends.',
        },
      ],
    },
    {
      category: 'Technical Requirements',
      questions: [
        {
          q: 'What tools/software do I need to know?',
          a: 'For AGD: Comfortable with at least one programming language (C/C++, Python, JavaScript). We\'ll teach you embedded systems, RTOS, protocols, and cloud platforms. For AGEE: Basic circuit analysis and understanding of electronics. We\'ll teach you PCB design tools, power electronics, and testing.',
        },
        {
          q: 'Do I need my own laptop/equipment?',
          a: 'You need a laptop (doesn\'t have to be expensive). We provide all development boards, test equipment, tools, and software licenses. For hardware work, our lab has oscilloscopes, power supplies, and prototyping equipment.',
        },
        {
          q: 'What if I haven\'t taken certain courses yet?',
          a: 'That\'s fine. We assess your ability to learn, not just what you already know. We provide internal training and resources. Many students learn topics "just in time" as projects require them.',
        },
      ],
    },
    {
      category: 'Logistics',
      questions: [
        {
          q: 'Where are you located?',
          a: 'Our main facilities are in Ghana, West Africa. We\'re working on expanding to other West African countries. Location details are provided upon acceptance.',
        },
        {
          q: 'Do you provide housing?',
          a: 'We don\'t directly provide housing, but we help students find affordable accommodation near our facilities. We also connect you with current students who can share housing.',
        },
        {
          q: 'What about visa/work permits for international students?',
          a: 'For students within West Africa (ECOWAS), movement is generally straightforward. For international students from outside the region, we provide support letters but you\'re responsible for visa arrangements.',
        },
      ],
    },
  ];

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
