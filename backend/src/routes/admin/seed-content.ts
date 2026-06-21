import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(authenticateToken);
router.use(requireRole('admin'));

// Seed team content endpoint
router.post('/team', async (req, res) => {
  console.log('🌱 Seeding team content via API...');

  const teamContent = [
    { key: 'team_hero_title', value: 'Our Team', type: 'text', section: 'team_hero' },
    { key: 'team_hero_subtitle', value: 'The people behind Africa\'s engineering transformation', type: 'text', section: 'team_hero' },
    { key: 'team_leadership_title', value: 'Executive Leadership', type: 'text', section: 'team_leadership' },
    { key: 'team_leadership_subtitle', value: 'Our leadership team brings together deep technical expertise, strategic vision, and commitment to African engineering excellence.', type: 'textarea', section: 'team_leadership' },
    { key: 'leader_1_title', value: 'Chief Engineer', type: 'text', section: 'team_leadership' },
    { key: 'leader_1_role', value: 'President & Chief Engineer', type: 'text', section: 'team_leadership' },
    { key: 'leader_1_description', value: 'Leading Alpha Power Station with expertise in systems architecture, embedded engineering, and strategic vision for integrated engineering solutions across West Africa.', type: 'textarea', section: 'team_leadership' },
    { key: 'leader_2_title', value: 'Power Systems Lead', type: 'text', section: 'team_leadership' },
    { key: 'leader_2_role', value: 'Head of Power Systems (AGEE)', type: 'text', section: 'team_leadership' },
    { key: 'leader_2_description', value: 'Specializing in power electronics, renewable energy systems, grid integration, and electrical engineering standards compliance for African infrastructure.', type: 'textarea', section: 'team_leadership' },
    { key: 'leader_3_title', value: 'Embedded Systems Lead', type: 'text', section: 'team_leadership' },
    { key: 'leader_3_role', value: 'Head of Embedded Systems (AGD)', type: 'text', section: 'team_leadership' },
    { key: 'leader_3_description', value: 'Expert in firmware development, real-time systems, IoT device design, and protocol implementation for smart infrastructure applications.', type: 'textarea', section: 'team_leadership' },
    { key: 'leader_4_title', value: 'R&D Lead', type: 'text', section: 'team_leadership' },
    { key: 'leader_4_role', value: 'Head of R&D and Sourcing', type: 'text', section: 'team_leadership' },
    { key: 'leader_4_description', value: 'Driving innovation through research initiatives, e-waste upcycling programs, and establishing sustainable supply chains for local component sourcing.', type: 'textarea', section: 'team_leadership' },
    { key: 'leader_5_title', value: 'Operations Lead', type: 'text', section: 'team_leadership' },
    { key: 'leader_5_role', value: 'Operations and Finance Lead', type: 'text', section: 'team_leadership' },
    { key: 'leader_5_description', value: 'Managing business operations, financial sustainability, partnerships, and ensuring scalable growth of Alpha Power Station initiatives.', type: 'textarea', section: 'team_leadership' },
    { key: 'team_structure_title', value: 'Team Structure', type: 'text', section: 'team_structure' },
    { key: 'team_structure_subtitle', value: 'Our collaborative environment spans two integrated divisions working seamlessly together', type: 'textarea', section: 'team_structure' },
    { key: 'agd_division_name', value: 'Alpha Group of Developers', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_division_tagline', value: 'Software & Embedded Teams', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_1_name', value: 'Embedded Systems Team', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_1_description', value: 'Firmware, RTOS, microcontroller programming', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_2_name', value: 'IoT & Connectivity Team', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_2_description', value: 'Cloud platforms, data pipelines, MQTT/CoAP', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_3_name', value: 'Web & Mobile Team', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_3_description', value: 'Frontend, backend, mobile applications', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_4_name', value: 'Protocol Implementation Team', type: 'text', section: 'team_structure_agd' },
    { key: 'agd_team_4_description', value: 'DLMS/COSEM, Modbus, communication stacks', type: 'text', section: 'team_structure_agd' },
  ];

  try {
    let created = 0;
    let skipped = 0;

    for (const content of teamContent) {
      const existing = await prisma.site_content.findUnique({ where: { key: content.key } });
      
      if (existing) {
        skipped++;
        continue;
      }

      await prisma.site_content.create({ data: content });
      created++;
    }

    res.json({
      success: true,
      message: 'Team content seeded successfully',
      created,
      skipped,
      total: teamContent.length,
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed content', details: error.message });
  }
});

export default router;
