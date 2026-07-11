import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample projects
  const projectData = [
    {
      slug: 'smart-prepaid-meter-system',
      title: 'Smart Prepaid Meter System',
      description: 'IEC 62055-41 compliant smart prepaid electricity meter with DLMS/COSEM protocol support, designed for West African power distribution networks.',
      category: 'commercial',
      division: 'integrated',
      status: 'active',
      technicalDetails: 'Hardware: STM32-based metering unit with ADE7880 energy measurement IC. Software: RTOS-based firmware with DLMS/COSEM stack, cloud connectivity via 4G LTE. Compliance: IEC 62055-41, IEC 62056-21.',
    },
    {
      slug: 'e-waste-upcycling-initiative',
      title: 'E-Waste Upcycling Initiative',
      description: 'Systematic approach to recovering and repurposing electronic components from e-waste for new engineering projects, reducing environmental impact while building locally sustainable supply chains.',
      category: 'foundational',
      division: 'AGEE',
      status: 'active',
      technicalDetails: 'Recovering microcontrollers, power supplies, sensors, and passive components. Establishing testing protocols and component grading system. Building inventory management system.',
    },
    {
      slug: 'hybrid-solar-microgrid-controller',
      title: 'Hybrid Solar Microgrid Controller',
      description: 'Advanced microgrid management system combining solar PV, battery storage, and grid backup with intelligent load management for commercial installations.',
      category: 'infrastructure',
      division: 'integrated',
      status: 'planning',
      technicalDetails: 'Real-time power optimization using MPPT controllers, battery management system (BMS), automatic transfer switching, remote monitoring and control via web dashboard.',
    },
  ];

  let projectsCreated = 0;
  for (const data of projectData) {
    const existing = await prisma.projects.findUnique({ where: { slug: data.slug } });
    if (!existing) {
      await prisma.projects.create({ data });
      projectsCreated++;
    }
  }
  console.log(`✅ Created ${projectsCreated} projects (${projectData.length - projectsCreated} already existed)`);

  // Create team members
  const teamMemberData = [
    {
      name: 'Chief Engineer',
      role: 'President & Chief Engineer',
      division: 'AGD',
      bio: 'Leading Alpha Power Station with expertise in systems architecture and embedded engineering.',
      featured: true,
    },
    {
      name: 'Power Systems Lead',
      role: 'Head of Power Systems',
      division: 'AGEE',
      bio: 'Specializing in power electronics, renewable energy systems, and grid integration.',
      featured: true,
    },
    {
      name: 'Embedded Systems Lead',
      role: 'Head of Embedded Systems',
      division: 'AGD',
      bio: 'Expert in firmware development, real-time systems, and IoT device design.',
      featured: true,
    },
  ];

  let teamMembersCreated = 0;
  for (const data of teamMemberData) {
    const existing = await prisma.team_members.findFirst({ where: { name: data.name, role: data.role } });
    if (!existing) {
      await prisma.team_members.create({ data });
      teamMembersCreated++;
    }
  }
  console.log(`✅ Created ${teamMembersCreated} team members (${teamMemberData.length - teamMembersCreated} already existed)`);

  // Create a sample student application
  const applicationEmail = 'kofi.mensah@university.edu.gh';
  const existingApplication = await prisma.student_applications.findUnique({ where: { email: applicationEmail } });
  if (!existingApplication) {
    await prisma.student_applications.create({
      data: {
        firstName: 'Kofi',
        lastName: 'Mensah',
        email: applicationEmail,
        phone: '+233241234567',
        university: 'Accra Technical University',
        division: 'AGD',
        status: 'pending',
      },
    });
    console.log('✅ Created sample student application');
  } else {
    console.log('⏭️  Sample student application already existed');
  }

  // Create a sample contact inquiry
  const existingInquiry = await prisma.contact_inquiries.findFirst({
    where: { email: 'partnerships@example.com', subject: 'Collaboration Opportunity' },
  });
  if (!existingInquiry) {
    await prisma.contact_inquiries.create({
      data: {
        name: 'Partner Organization',
        email: 'partnerships@example.com',
        subject: 'Collaboration Opportunity',
        message: 'We are interested in exploring partnership opportunities for power infrastructure projects.',
        type: 'partnership',
        status: 'new',
      },
    });
    console.log('✅ Created sample contact inquiry');
  } else {
    console.log('⏭️  Sample contact inquiry already existed');
  }

  console.log('\n🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
