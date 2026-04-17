import { config } from 'dotenv';
config({ path: '.env.local' });

import { prisma } from './src/lib/prisma';

async function main() {
  const admins = await prisma.user.findMany({
    where: {
      role: 'admin',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      password: true,
    },
  });

  console.log("=== ADMIN ACCOUNTS ===");
  console.log(JSON.stringify(admins, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
