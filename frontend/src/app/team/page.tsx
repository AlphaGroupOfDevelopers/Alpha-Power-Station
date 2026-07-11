import Link from 'next/link';
import { FaUserTie, FaBolt, FaMicrochip, FaFlask, FaChartLine, FaCode, FaServer, FaMobile, FaNetworkWired, FaTools, FaDraftingCompass, FaSolarPanel, FaCheckCircle, FaUsers, FaLaptopCode, FaCog } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { GiElectric } from 'react-icons/gi';
import { getSiteContent, pick, pickJSON } from '@/lib/site-content';

export const metadata = {
  title: 'Our Team | Alpha Power Station',
  description: 'Meet the leadership, team structure, and talented students driving innovation at Alpha Power Station.',
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string | null;
  imageUrl: string | null;
}

interface DivisionTeam {
  name: string;
  description: string;
}

interface StudentSpotlight {
  initials: string;
  name: string;
  role: string;
  division: string;
  description: string;
  learning: string;
}

const LEADER_GRADIENTS = [
  'from-blue-600 to-blue-800',
  'from-green-600 to-green-800',
  'from-purple-600 to-purple-800',
  'from-orange-600 to-orange-800',
  'from-red-600 to-red-800',
];

const AGD_ICONS = [FaMicrochip, FaNetworkWired, FaMobile, FaServer];
const AGEE_ICONS = [FaBolt, FaDraftingCompass, FaSolarPanel, FaCheckCircle];
const SPOTLIGHT_STYLES = [
  { gradient: 'from-blue-400 to-blue-600', text: 'text-blue-600' },
  { gradient: 'from-green-400 to-green-600', text: 'text-green-600' },
  { gradient: 'from-purple-400 to-purple-600', text: 'text-purple-600' },
];

const DEFAULT_AGD_TEAMS: DivisionTeam[] = [
  { name: 'Embedded Systems Team', description: 'Firmware, RTOS, microcontroller programming' },
  { name: 'IoT & Connectivity Team', description: 'Cloud platforms, data pipelines, MQTT/CoAP' },
  { name: 'Web & Mobile Team', description: 'Frontend, backend, mobile applications' },
  { name: 'Protocol Implementation Team', description: 'DLMS/COSEM, Modbus, communication stacks' },
];

const DEFAULT_AGEE_TEAMS: DivisionTeam[] = [
  { name: 'Power Electronics Team', description: 'Metering, energy measurement, MPPT design' },
  { name: 'PCB Design Team', description: 'Circuit design, layout, prototyping' },
  { name: 'Renewable Energy Team', description: 'Solar systems, battery management, microgrids' },
  { name: 'Testing & Certification Team', description: 'IEC compliance, safety testing, field validation' },
];

const DEFAULT_SPOTLIGHTS: StudentSpotlight[] = [
  { initials: 'KM', name: 'Kofi Mensah', role: 'Software Engineering Intern', division: 'AGD', description: 'Working on DLMS/COSEM protocol implementation for smart meters and cloud monitoring dashboards.', learning: 'Embedded systems, IoT protocols, cloud integration' },
];

async function getLeadership(): Promise<TeamMember[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  try {
    const response = await fetch(`${API_URL}/team?featured=true`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

export default async function TeamPage() {
  const [leadership, content] = await Promise.all([getLeadership(), getSiteContent('team')]);
  const agdTeams = pickJSON(content, 'team.agd_teams', DEFAULT_AGD_TEAMS);
  const ageeTeams = pickJSON(content, 'team.agee_teams', DEFAULT_AGEE_TEAMS);
  const spotlights = pickJSON(content, 'team.student_spotlights', DEFAULT_SPOTLIGHTS);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">{pick(content, 'team.hero_title', 'Our Team')}</h1>
            <p className="text-xl text-gray-200">
              {pick(content, 'team.hero_subtitle', "The people behind Africa's engineering transformation")}
            </p>
          </div>
        </div>
      </section>

      {/* Executive Leadership - WRD Section 4.3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Executive Leadership</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Our leadership team brings together deep technical expertise, strategic vision, and 
              commitment to African engineering excellence.
            </p>
            
            {leadership.length === 0 ? (
              <p className="text-center text-gray-500">
                Leadership profiles will appear here once added from the admin dashboard.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {leadership.map((leader, index) => (
                  <div
                    key={leader.id}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-xl transition"
                  >
                    {leader.imageUrl ? (
                      <img
                        src={leader.imageUrl}
                        alt={leader.name}
                        className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
                      />
                    ) : (
                      <div
                        className={`w-24 h-24 bg-gradient-to-br ${LEADER_GRADIENTS[index % LEADER_GRADIENTS.length]} rounded-full flex items-center justify-center text-white text-3xl mb-4 mx-auto`}
                      >
                        <FaUserTie />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-center mb-2">{leader.name}</h3>
                    <p className="text-center text-blue-600 font-semibold mb-4">
                      {leader.role} ({leader.division})
                    </p>
                    {leader.bio && <p className="text-gray-600 text-sm">{leader.bio}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Structure - WRD Section 4.3 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">{pick(content, 'team.structure_title', 'Team Structure')}</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              {pick(content, 'team.structure_subtitle', 'Our collaborative environment spans two integrated divisions working seamlessly together')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* AGD Teams */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                    AGD
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Alpha Group of Developers</h3>
                    <p className="text-gray-600">Software & Embedded Teams</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {agdTeams.map((team, index) => {
                    const Icon = AGD_ICONS[index % AGD_ICONS.length];
                    return (
                      <div key={team.name} className="border-l-4 border-blue-600 pl-4 flex items-start gap-3">
                        <Icon className="text-blue-600 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold mb-1">{team.name}</h4>
                          <p className="text-sm text-gray-600">{team.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AGEE Teams */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                    AGEE
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Alpha Group of Electronics & Electricals</h3>
                    <p className="text-gray-600">Hardware & Power Teams</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ageeTeams.map((team, index) => {
                    const Icon = AGEE_ICONS[index % AGEE_ICONS.length];
                    return (
                      <div key={team.name} className="border-l-4 border-green-600 pl-4 flex items-start gap-3">
                        <Icon className="text-green-600 text-xl flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold mb-1">{team.name}</h4>
                          <p className="text-sm text-gray-600">{team.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Cross-Functional Collaboration */}
            <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 rounded-lg p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaUsers className="text-3xl text-purple-600" />
                <h3 className="text-2xl font-bold">Cross-Functional Collaboration</h3>
              </div>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Teams from both divisions work together daily in integrated project squads, 
                ensuring seamless hardware-software development through our 4-stage workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Spotlights - WRD Section 4.3 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">Student Spotlights</h2>
            <p className="text-lg text-gray-700 mb-12 text-center max-w-3xl mx-auto">
              Meet some of the talented students contributing to real-world engineering projects
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {spotlights.map((student, index) => {
                const { gradient, text } = SPOTLIGHT_STYLES[index % SPOTLIGHT_STYLES.length];
                return (
                  <div key={student.name} className="bg-white border rounded-lg overflow-hidden hover:shadow-xl transition">
                    <div className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                      <div className={`w-32 h-32 bg-white rounded-full flex items-center justify-center ${text} text-4xl font-bold`}>
                        {student.initials}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                      <p className={`${text} font-semibold mb-3`}>{student.role}</p>
                      <p className="text-sm text-gray-600 mb-3">
                        <strong>Division:</strong> {student.division}
                      </p>
                      <p className="text-gray-700 mb-4">{student.description}</p>
                      <div className="text-sm text-gray-600">
                        <strong>Learning:</strong> {student.learning}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Team
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Work alongside experienced engineers and talented students building the future of African infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/student-programs"
              className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition inline-flex items-center justify-center gap-2"
            >
              <FaLaptopCode className="text-2xl" />
              Explore Student Programs
            </Link>
            <Link
              href="/student-programs/apply"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
            >
              <IoRocketSharp className="text-2xl" />
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
