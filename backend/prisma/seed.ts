import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Smart Prepaid Meter System',
        description: 'IEC 62055-41 compliant smart prepaid electricity meter with DLMS/COSEM protocol support, designed for West African power distribution networks.',
        category: 'commercial',
        division: 'integrated',
        status: 'active',
        technicalDetails: 'Hardware: STM32-based metering unit with ADE7880 energy measurement IC. Software: RTOS-based firmware with DLMS/COSEM stack, cloud connectivity via 4G LTE. Compliance: IEC 62055-41, IEC 62056-21.',
      },
    }),
    prisma.project.create({
      data: {
        title: 'E-Waste Upcycling Initiative',
        description: 'Systematic approach to recovering and repurposing electronic components from e-waste for new engineering projects, reducing environmental impact while building locally sustainable supply chains.',
        category: 'foundational',
        division: 'AGEE',
        status: 'active',
        technicalDetails: 'Recovering microcontrollers, power supplies, sensors, and passive components. Establishing testing protocols and component grading system. Building inventory management system.',
      },
    }),
    prisma.project.create({
      data: {
        title: 'Hybrid Solar Microgrid Controller',
        description: 'Advanced microgrid management system combining solar PV, battery storage, and grid backup with intelligent load management for commercial installations.',
        category: 'infrastructure',
        division: 'integrated',
        status: 'planning',
        technicalDetails: 'Real-time power optimization using MPPT controllers, battery management system (BMS), automatic transfer switching, remote monitoring and control via web dashboard.',
      },
    }),
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  // Create team members
  const teamMembers = await Promise.all([
    prisma.teamMember.create({
      data: {
        name: 'Chief Engineer',
        role: 'President & Chief Engineer',
        division: 'AGD',
        bio: 'Leading Alpha Power Station with expertise in systems architecture and embedded engineering.',
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Power Systems Lead',
        role: 'Head of Power Systems',
        division: 'AGEE',
        bio: 'Specializing in power electronics, renewable energy systems, and grid integration.',
      },
    }),
    prisma.teamMember.create({
      data: {
        name: 'Embedded Systems Lead',
        role: 'Head of Embedded Systems',
        division: 'AGD',
        bio: 'Expert in firmware development, real-time systems, and IoT device design.',
      },
    }),
  ]);

  console.log(`✅ Created ${teamMembers.length} team members`);

  // Create a sample student application
  const application = await prisma.studentApplication.create({
    data: {
      firstName: 'Kofi',
      lastName: 'Mensah',
      email: 'kofi.mensah@university.edu.gh',
      phone: '+233241234567',
      university: 'Accra Technical University',
      division: 'AGD',
      status: 'pending',
    },
  });

  console.log('✅ Created sample student application');

  // Create a sample contact inquiry
  const inquiry = await prisma.contactInquiry.create({
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

  console.log('\n🎉 Database seeded successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - ${projects.length} projects`);
  console.log(`   - ${teamMembers.length} team members`);
  console.log(`   - 1 student application`);
  console.log(`   - 1 contact inquiry`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
