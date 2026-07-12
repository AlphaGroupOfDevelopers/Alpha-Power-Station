import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const leadership = [
  {
    name: 'Chief Engineer',
    role: 'President & Chief Engineer',
    division: 'AGD',
    bio: 'Leading Alpha Power Station with expertise in systems architecture, embedded engineering, and strategic vision for integrated engineering solutions across West Africa.',
    featured: true,
    order: 0,
  },
  {
    name: 'Power Systems Lead',
    role: 'Head of Power Systems (AGEE)',
    division: 'AGEE',
    bio: 'Specializing in power electronics, renewable energy systems, grid integration, and electrical engineering standards compliance for African infrastructure.',
    featured: true,
    order: 1,
  },
  {
    name: 'Embedded Systems Lead',
    role: 'Head of Embedded Systems (AGD)',
    division: 'AGD',
    bio: 'Expert in firmware development, real-time systems, IoT device design, and protocol implementation for smart infrastructure applications.',
    featured: true,
    order: 2,
  },
  {
    name: 'R&D Lead',
    role: 'Head of R&D and Sourcing',
    division: 'AGEE',
    bio: 'Driving innovation through research initiatives, e-waste upcycling programs, and establishing sustainable supply chains for local component sourcing.',
    featured: true,
    order: 3,
  },
  {
    name: 'Operations Lead',
    role: 'Operations and Finance Lead',
    division: 'AGD',
    bio: "Managing business operations, financial sustainability, partnerships, and ensuring scalable growth of Alpha Power Station's initiatives.",
    featured: true,
    order: 4,
  },
];

async function seedTeamMembers() {
  console.log('🌱 Seeding leadership team members...\n');

  let created = 0;
  let skipped = 0;

  for (const member of leadership) {
    const existing = await prisma.team_members.findFirst({
      where: { name: member.name, role: member.role },
    });

    if (existing) {
      skipped++;
      continue;
    }

    await prisma.team_members.create({ data: member });
    created++;
  }

  console.log(`✨ Complete! Created: ${created}, Skipped: ${skipped}, Total: ${leadership.length}`);
  console.log('\nNote: division was assigned based on the original site copy where it');
  console.log('was implicit (Chief Engineer, R&D Lead, Operations Lead). Edit any of');
  console.log('these from the admin dashboard if a different division fits better.');
}

seedTeamMembers()
  .catch((e) => {
    console.error('❌ Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
