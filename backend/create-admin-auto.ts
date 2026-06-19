import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  console.log('\n🔐 Creating Admin User...\n');

  try {
    const email = 'admin@alphapower.com';
    const name = 'Admin User';
    const password = 'admin123';

    // Check if user already exists
    const existing = await prisma.admin_users.findUnique({
      where: { email }
    });

    if (existing) {
      console.log('✅ Admin user already exists!');
      console.log(`Email: ${email}`);
      console.log(`Password: admin123`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await prisma.admin_users.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'admin',
        isActive: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Admin user created successfully!\n');
    console.log('Login Credentials:');
    console.log('------------------');
    console.log(`Email: ${admin.email}`);
    console.log(`Password: admin123`);
    console.log(`\n✨ You can now login at http://localhost:3000\n`);

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
