import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const roadmapQuarters = [
  {
    quarter: 'Q2 2026',
    status: 'Current',
    projects: [
      { title: 'Smart Prepaid Meter - Phase 2', type: 'Commercial', description: 'Scaling deployment to 10,000 units across 5 regions', progress: 60 },
      { title: 'E-Waste Recovery Facility', type: 'Foundational', description: 'Establishing dedicated facility for component testing and grading', progress: 40 },
    ],
  },
  {
    quarter: 'Q3 2026',
    status: 'Planned',
    projects: [
      { title: 'Hybrid Solar Microgrid - Pilot', type: 'Infrastructure', description: '50kW system for commercial building installation', progress: 20 },
      { title: 'IoT Platform v2.0', type: 'Commercial', description: 'Enhanced analytics and predictive maintenance features', progress: 15 },
    ],
  },
  {
    quarter: 'Q4 2026',
    status: 'Planned',
    projects: [
      { title: 'Smart Street Lighting', type: 'Infrastructure', description: 'Solar-powered adaptive lighting system pilot', progress: 10 },
      { title: 'Battery Management System', type: 'Commercial', description: 'BMS for lithium-ion battery packs in renewable systems', progress: 5 },
    ],
  },
  {
    quarter: 'Q1 2027',
    status: 'Future',
    projects: [
      { title: 'Electric Vehicle Charger', type: 'Infrastructure', description: 'AC/DC charging stations for West African markets', progress: 0 },
      { title: 'Water Quality Monitoring', type: 'Commercial', description: 'IoT-based water quality sensors for distribution networks', progress: 0 },
    ],
  },
];

const faqItems = [
  {
    category: 'Application Process',
    questions: [
      { q: 'Who is eligible to apply?', a: 'We accept applications from current university students (any year) and recent graduates (within 1 year). All disciplines are welcome, though engineering and technology backgrounds are preferred. Most importantly, we look for passion, curiosity, and commitment to learning.' },
      { q: 'When should I apply?', a: 'Applications are reviewed on a rolling basis throughout the year. We have intake cohorts starting in January, April, July, and October. We recommend applying at least 6-8 weeks before your desired start date.' },
      { q: 'How long does the application process take?', a: 'From submission to decision typically takes 2-3 weeks. This includes the technical assessment (3-5 days), interview scheduling (1 week), and final decision (1 week). We move quickly to ensure you have enough time to plan.' },
      { q: "What if I don't have prior experience?", a: 'Prior experience is helpful but not required. We look for strong fundamentals, problem-solving ability, and eagerness to learn. Many of our most successful students had limited experience when they joined. What matters is your attitude and commitment.' },
    ],
  },
  {
    category: 'Program Details',
    questions: [
      { q: 'How long is the program?', a: 'Programs are flexible, ranging from 6 to 12 months. We work with your academic schedule. Most students participate for 6-9 months, which provides enough time to complete meaningful projects and develop strong skills.' },
      { q: 'What is the time commitment?', a: 'We require a minimum of 20 hours per week. Most students commit 30-40 hours/week during semester breaks and 20-25 hours/week during term time. The program is intensive—this is not a casual internship.' },
      { q: 'Is this remote or in-person?', a: 'Currently, we operate primarily in-person at our facilities in West Africa. This allows for better hardware-software integration work, mentorship, and team collaboration. Some remote flexibility is available for exceptional circumstances.' },
      { q: 'Do I get paid?', a: 'Yes. We provide stipends to help cover living expenses. The amount varies based on your year of study, commitment level (part-time vs full-time), and performance. Top performers may receive performance bonuses and equipment stipends.' },
    ],
  },
  {
    category: 'Learning & Growth',
    questions: [
      { q: 'What will I actually work on?', a: 'Real projects, not toy problems. You might implement firmware for smart meters deployed to thousands of homes, design PCBs for renewable energy systems, build IoT platforms, or develop testing protocols. Your work has real impact from day one.' },
      { q: 'Will I get mentorship?', a: "Absolutely. Each student is assigned a mentor from our technical leadership. You'll have weekly 1-on-1 meetings, regular code/design reviews, and access to the full team for questions. Learning is central to our culture." },
      { q: 'Can I switch between AGD and AGEE?', a: "Yes! We encourage cross-division learning. While you'll have a primary division (AGD or AGEE), you'll work on integrated projects and can participate in workshops and sessions from the other division." },
      { q: 'What happens after the program?', a: "Many outcomes: full-time job offers at Alpha or partner companies, funded graduate school opportunities, strong recommendation letters, and a portfolio of real projects. Our alumni network is strong—they help each other long after the program ends." },
    ],
  },
  {
    category: 'Technical Requirements',
    questions: [
      { q: 'What tools/software do I need to know?', a: "For AGD: Comfortable with at least one programming language (C/C++, Python, JavaScript). We'll teach you embedded systems, RTOS, protocols, and cloud platforms. For AGEE: Basic circuit analysis and understanding of electronics. We'll teach you PCB design tools, power electronics, and testing." },
      { q: 'Do I need my own laptop/equipment?', a: "You need a laptop (doesn't have to be expensive). We provide all development boards, test equipment, tools, and software licenses. For hardware work, our lab has oscilloscopes, power supplies, and prototyping equipment." },
      { q: "What if I haven't taken certain courses yet?", a: 'That\'s fine. We assess your ability to learn, not just what you already know. We provide internal training and resources. Many students learn topics "just in time" as projects require them.' },
    ],
  },
  {
    category: 'Logistics',
    questions: [
      { q: 'Where are you located?', a: "Our main facilities are in Ghana, West Africa. We're working on expanding to other West African countries. Location details are provided upon acceptance." },
      { q: 'Do you provide housing?', a: "We don't directly provide housing, but we help students find affordable accommodation near our facilities. We also connect you with current students who can share housing." },
      { q: 'What about visa/work permits for international students?', a: "For students within West Africa (ECOWAS), movement is generally straightforward. For international students from outside the region, we provide support letters but you're responsible for visa arrangements." },
    ],
  },
];

const agdTeams = [
  { name: 'Embedded Systems Team', description: 'Firmware, RTOS, microcontroller programming' },
  { name: 'IoT & Connectivity Team', description: 'Cloud platforms, data pipelines, MQTT/CoAP' },
  { name: 'Web & Mobile Team', description: 'Frontend, backend, mobile applications' },
  { name: 'Protocol Implementation Team', description: 'DLMS/COSEM, Modbus, communication stacks' },
];

const ageeTeams = [
  { name: 'Power Electronics Team', description: 'Metering, energy measurement, MPPT design' },
  { name: 'PCB Design Team', description: 'Circuit design, layout, prototyping' },
  { name: 'Renewable Energy Team', description: 'Solar systems, battery management, microgrids' },
  { name: 'Testing & Certification Team', description: 'IEC compliance, safety testing, field validation' },
];

const studentSpotlights = [
  {
    initials: 'KM',
    name: 'Kofi Mensah',
    role: 'Software Engineering Intern',
    division: 'AGD',
    description: 'Working on DLMS/COSEM protocol implementation for smart meters and cloud monitoring dashboards. Previously contributed to firmware optimization.',
    learning: 'Embedded systems, IoT protocols, cloud integration',
  },
  {
    initials: 'AN',
    name: 'Amina Nkrumah',
    role: 'Hardware Engineering Intern',
    division: 'AGEE',
    description: 'Designing power electronics circuits for renewable energy systems and leading the e-waste component recovery testing protocols.',
    learning: 'Power electronics, PCB design, energy metering',
  },
  {
    initials: 'EO',
    name: 'Emmanuel Osei',
    role: 'Full-Stack Engineering Intern',
    division: 'AGD & AGEE (Integrated)',
    description: 'Building monitoring dashboards for microgrid systems while learning hardware integration. Bridge between software and hardware teams.',
    learning: 'Full-stack development, hardware-software integration',
  },
];

const siteContent: { key: string; value: string; type: string; section: string }[] = [
  // Home
  { key: 'home.hero_title', value: 'Building the Future of Africa-Proof Engineering', type: 'text', section: 'home' },
  { key: 'home.hero_subtitle', value: 'Premier integrated engineering and technology hub in West Africa. Solving critical infrastructure challenges through locally designed, climate-resilient, commercially viable systems.', type: 'textarea', section: 'home' },
  { key: 'home.intro_title', value: 'Integrated Engineering Excellence', type: 'text', section: 'home' },
  { key: 'home.intro_body', value: "Alpha Power Station unites two powerful divisions: Alpha Group of Developers (AGD) for cutting-edge software and embedded systems, and Alpha Group of Electronics & Electricals (AGEE) for innovative hardware engineering. Together, we create integrated solutions that transform West Africa's infrastructure landscape.", type: 'textarea', section: 'home' },

  // About
  { key: 'about.vision', value: 'To become the premier integrated engineering and technology hub in West Africa, pioneering locally designed, climate-resilient, and commercially viable systems that solve critical infrastructure challenges across the continent.', type: 'textarea', section: 'about' },
  { key: 'about.mission', value: 'To develop and deploy Africa-Proof Engineering solutions through the seamless integration of software and hardware expertise, fostering innovation, sustainability, and local economic development while training the next generation of African engineers.', type: 'textarea', section: 'about' },
  { key: 'about.story', value: "Alpha Power Station emerged from a simple observation: West Africa's infrastructure challenges require more than imported solutions. They demand engineering approaches designed from the ground up for African contexts—systems that can thrive in our climate, work with our power grids, and be maintained by our technicians.\n\nWhat began as small-scale projects in power metering and embedded systems evolved into a comprehensive engineering hub. By bringing together software developers and hardware engineers under one roof, we discovered the power of true integration—where firmware developers collaborate directly with circuit designers, and IoT platforms are built hand-in-hand with the devices they monitor.\n\nKey milestones in our journey include the development of our first IEC 62055-41 compliant smart prepaid meter, the establishment of our E-waste upcycling initiative, and the formation of partnerships with university incubators like the ATU Incubator Hub.\n\nToday, Alpha Power Station stands as a testament to what African engineering can achieve: innovative, sustainable, and impactful solutions that don't just work here—they thrive here.", type: 'textarea', section: 'about' },

  // Contact
  { key: 'contact.general_email', value: 'info@alphapowerstation.org', type: 'text', section: 'contact' },
  { key: 'contact.media_email', value: 'media@alphapowerstation.org', type: 'text', section: 'contact' },
  { key: 'contact.partnerships_email', value: 'partnerships@alphapowerstation.org', type: 'text', section: 'contact' },
  { key: 'contact.students_email', value: 'students@alphapowerstation.org', type: 'text', section: 'contact' },
  { key: 'contact.location_name', value: 'Alpha Power Station HQ', type: 'text', section: 'contact' },
  { key: 'contact.location_address', value: 'Accra Technology University\nInnovation Hub\nAccra, Ghana', type: 'textarea', section: 'contact' },

  // Partnerships
  { key: 'partnerships.intro_body', value: 'We offer unique value through our integrated hardware-software approach, deep understanding of African infrastructure challenges, and commitment to sustainable, locally-designed solutions. Partnering with us means access to innovative talent, cutting-edge projects, and meaningful social impact.', type: 'textarea', section: 'partnerships' },

  // Roadmap
  { key: 'roadmap.quarters', value: JSON.stringify(roadmapQuarters), type: 'json', section: 'roadmap' },

  // FAQ
  { key: 'faq.items', value: JSON.stringify(faqItems), type: 'json', section: 'faq' },

  // Team
  { key: 'team.hero_title', value: 'Our Team', type: 'text', section: 'team' },
  { key: 'team.hero_subtitle', value: "The people behind Africa's engineering transformation", type: 'text', section: 'team' },
  { key: 'team.structure_title', value: 'Team Structure', type: 'text', section: 'team' },
  { key: 'team.structure_subtitle', value: 'Our collaborative environment spans two integrated divisions working seamlessly together', type: 'textarea', section: 'team' },
  { key: 'team.agd_teams', value: JSON.stringify(agdTeams), type: 'json', section: 'team' },
  { key: 'team.agee_teams', value: JSON.stringify(ageeTeams), type: 'json', section: 'team' },
  { key: 'team.student_spotlights', value: JSON.stringify(studentSpotlights), type: 'json', section: 'team' },
];

async function seedSiteContent() {
  console.log('🌱 Seeding site content...\n');

  let created = 0;
  let skipped = 0;

  for (const content of siteContent) {
    const existing = await prisma.site_content.findUnique({ where: { key: content.key } });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.site_content.create({ data: content });
    created++;
  }

  console.log(`✨ Complete! Created: ${created}, Skipped: ${skipped}, Total: ${siteContent.length}`);
}

seedSiteContent()
  .catch((e) => {
    console.error('❌ Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
