import { config } from 'dotenv';
config({ path: '.env.local' });

import { prisma } from './src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  await prisma.user.update({
    where: { email: 'kontol@kuda.com' },
    data: { password: hashedPassword }
  });

  console.log("Password for kontol@kuda.com has been successfully reset to: admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
