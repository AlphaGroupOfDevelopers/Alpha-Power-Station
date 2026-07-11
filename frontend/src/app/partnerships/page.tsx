import Link from 'next/link';
import { getSiteContent, pick } from '@/lib/site-content';

export const metadata = {
  title: 'Partnerships & Collaborations | Alpha Power Station',
  description: 'Partner with Alpha Power Station for innovative engineering solutions, talent development, and impactful collaborations across West Africa.',
};

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  website: string | null;
}

async function getPartners(): Promise<Partner[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/partners`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function PartnershipsPage() {
  const [partners, content] = await Promise.all([getPartners(), getSiteContent('partnerships')]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Partner with Us</h1>
            <p className="text-xl text-gray-200">
              Collaborate with West Africa's premier integrated engineering and technology hub
            </p>
          </div>
        </div>
      </section>

      {/* Partner with Us - WRD Section 4.6 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why Partner with Alpha Power Station?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              {pick(
                content,
                'partnerships.intro_body',
                'We offer unique value through our integrated hardware-software approach, deep understanding of African infrastructure challenges, and commitment to sustainable, locally-designed solutions. Partnering with us means access to innovative talent, cutting-edge projects, and meaningful social impact.'
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-3">Access to Talent</h3>
              <p className="text-gray-600">
                Connect with highly-skilled engineering students and graduates trained in 
                real-world project delivery and Africa-Proof Engineering principles.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Innovative Solutions</h3>
              <p className="text-gray-600">
                Leverage our expertise in smart metering, renewable energy, IoT platforms, 
                and custom engineering solutions for African markets.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Social Impact</h3>
              <p className="text-gray-600">
                Support initiatives that transform African infrastructure while fostering 
                youth empowerment and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Collaboration - WRD Section 4.6 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Areas of Collaboration</h2>
            
            <div className="space-y-8">
              {/* Research & Development */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start">
                  <div className="text-4xl mr-6">🔬</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Research & Development</h3>
                    <p className="text-gray-700 mb-4">
                      Joint research initiatives on Africa-Proof Engineering, renewable energy integration, 
                      smart grid technologies, and sustainable electronics manufacturing.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Co-authored research papers and publications</li>
                      <li>• Shared IP development and licensing</li>
                      <li>• Access to our testing facilities and equipment</li>
                      <li>• Collaborative grant applications</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Project Sponsorship */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start">
                  <div className="text-4xl mr-6">💼</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Project Sponsorship</h3>
                    <p className="text-gray-700 mb-4">
                      Support specific engineering projects that align with your organization's goals 
                      while creating measurable social impact.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Sponsor student projects and competitions</li>
                      <li>• Fund infrastructure deployments</li>
                      <li>• Support e-waste upcycling initiatives</li>
                      <li>• Recognition and branding opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Talent Development */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start">
                  <div className="text-4xl mr-6">👥</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Talent Development</h3>
                    <p className="text-gray-700 mb-4">
                      Build your talent pipeline by partnering with us on student programs, 
                      internships, and graduate placements.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Early access to top engineering talent</li>
                      <li>• Custom training programs for your needs</li>
                      <li>• Internship and co-op opportunities</li>
                      <li>• Campus recruitment partnerships</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technical Consulting */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-start">
                  <div className="text-4xl mr-6">⚙️</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">Technical Consulting</h3>
                    <p className="text-gray-700 mb-4">
                      Leverage our expertise for custom engineering solutions, product development, 
                      and market adaptation for African contexts.
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Africa-Proof product design consultation</li>
                      <li>• Embedded systems and IoT development</li>
                      <li>• Power electronics and renewable energy systems</li>
                      <li>• Standards compliance and certification support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory & Standards Compliance - WRD Section 4.6 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Regulatory & Standards Compliance</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              We maintain rigorous adherence to national and international standards, 
              ensuring our solutions meet regulatory requirements for market deployment.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">International Standards</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• IEC 62055-41 (Electricity metering)</li>
                  <li>• IEC 62056-21 (DLMS/COSEM)</li>
                  <li>• IEC 61000 (EMC compliance)</li>
                  <li>• ISO 9001 (Quality management)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Regional Compliance</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• GSA (Ghana Standards Authority)</li>
                  <li>• Energy Commission certifications</li>
                  <li>• AfCFTA trade compliance</li>
                  <li>• ECOWAS regional standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Incubation & Technology Transfer - WRD Section 4.6 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Incubation & Technology Transfer</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              We work closely with university incubators and technology transfer offices to 
              protect intellectual property and commercialize innovations.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold mb-4">Current Partnerships</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>ATU Incubator Hub:</strong> Collaborative workspace and mentorship programs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>University Research Centers:</strong> Joint research initiatives and student projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span><strong>Innovation Hubs:</strong> Access to prototyping facilities and networking events</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold mb-4">Intellectual Property Protection</h3>
              <p className="text-gray-700 mb-4">
                We have clear policies and agreements for IP ownership, licensing, and commercialization:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Patent filing support for breakthrough innovations</li>
                <li>• Open-source contributions for community benefit</li>
                <li>• Technology licensing agreements with partners</li>
                <li>• Clear IP attribution for collaborative projects</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Partners (Placeholder) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Our Partners & Supporters</h2>
            <p className="text-gray-600 mb-8">
              We're proud to collaborate with leading organizations committed to African innovation
            </p>
            {partners.length === 0 ? (
              <p className="text-gray-400">Partner logos will appear here once added from the admin dashboard.</p>
            ) : (
              <div className="grid md:grid-cols-4 gap-8">
                {partners.map((partner) => {
                  const content = partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold">{partner.name}</span>
                  );
                  return (
                    <div key={partner.id} className="bg-gray-100 h-32 rounded-lg flex items-center justify-center p-4">
                      {partner.website ? (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" title={partner.name}>
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-900 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Let's Build Something Together
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Whether you're an academic institution, corporation, or NGO, 
            we'd love to explore partnership opportunities
          </p>
          <Link
            href="/contact"
            className="inline-block bg-yellow-400 text-purple-900 px-12 py-5 rounded-lg font-bold text-xl hover:bg-yellow-300 transition"
          >
            Get in Touch
          </Link>
          <p className="mt-6 text-gray-300">
            Or email us at{' '}
            <a href="mailto:partnerships@alphapowerstation.org" className="underline hover:text-white">
              partnerships@alphapowerstation.org
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
