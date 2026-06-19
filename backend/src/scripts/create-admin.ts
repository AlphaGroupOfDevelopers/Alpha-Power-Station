import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  console.log('\n🔐 Create Admin User\n');
  console.log('===================================\n');

  try {
    const email = await question('Email: ');
    const name = await question('Name: ');
    const password = await question('Password (min 8 characters): ');
    const confirmPassword = await question('Confirm Password: ');

    if (password !== confirmPassword) {
      console.error('❌ Passwords do not match!');
      rl.close();
      return;
    }

    if (password.length < 8) {
      console.error('❌ Password must be at least 8 characters!');
      rl.close();
      return;
    }

    // Check if user already exists
    const existing = await prisma.admin_users.findUnique({
      where: { email }
    });

    if (existing) {
      console.error('❌ User with this email already exists!');
      rl.close();
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

    console.log('\n✅ Admin user created successfully!\n');
    console.log('User Details:');
    console.log('-------------');
    console.log(`ID: ${admin.id}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Name: ${admin.name}`);
    console.log(`Role: ${admin.role}`);
    console.log(`Created: ${admin.createdAt}`);
    console.log('\n✨ You can now login to the CMS!\n');

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

createAdmin();
