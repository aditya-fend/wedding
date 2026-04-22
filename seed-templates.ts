import { config } from 'dotenv';
config({ path: '.env' });
import { prisma } from './src/lib/prisma.ts';

const templatesToSeed = [
  {
    title: 'Nero Gold',
    description: 'Template eksklusif bernuansa hitam dan emas.',
    category: 'Modern',
    configPath: 'templates/nero-gold.json',
  },
  {
    title: 'Aura Dark',
    description: 'Nuansa gelap elegan untuk pernikahan modern.',
    category: 'Modern',
    configPath: 'templates/aura-dark.json',
  },
  {
    title: 'Pink',
    description: 'Warna pink yang manis dan romantis.',
    category: 'Romantis',
    configPath: 'templates/pink.json',
  },
  {
    title: 'Royal',
    description: 'Tema royal yang megah bak kerajaan.',
    category: 'Klasik',
    configPath: 'templates/royal.json',
  },
  {
    title: 'Jawa Royal Keraton',
    description: 'Kemegahan keraton Jawa yang kental dengan adat.',
    category: 'Tradisional',
    configPath: 'templates/jawa-royal-keraton.json',
  },
  {
    title: 'Sunda Anggun Priangan',
    description: 'Keanggunan adat Sunda dengan sentuhan alam.',
    category: 'Tradisional',
    configPath: 'templates/sunda-anggun-priangan.json',
  },
  {
    title: 'Minang Maharaja',
    description: 'Kemeriahan Baralek Gadang khas Minangkabau.',
    category: 'Tradisional',
    configPath: 'templates/minang-maharaja.json',
  },
  {
    title: 'Bali Sacred Luxury',
    description: 'Kemewahan resort dan kesucian adat Bali.',
    category: 'Tradisional',
    configPath: 'templates/bali-sacred-luxury.json',
  },
  {
    title: 'Batak Heritage',
    description: 'Ketegasan dan kemegahan ornamen Gorga Batak.',
    category: 'Tradisional',
    configPath: 'templates/batak-heritage.json',
  },
  {
    title: 'Bugis Golden Silk',
    description: 'Kekayaan warna dan kemewahan sutra Bugis.',
    category: 'Tradisional',
    configPath: 'templates/bugis-golden-silk.json',
  },
  {
    title: 'Gen Z Pastel',
    description: 'Clean aesthetic minimalis ala Gen Z — cream, sage, beige dengan sentuhan elegan classy.',
    category: 'Gen-Z',
    configPath: 'templates/gen-z-pastel.json',
  }
];

async function main() {
  console.log('Mulai melakukan seeding templates...');
  for (const templateData of templatesToSeed) {
    const existing = await prisma.template.findFirst({
      where: {
        title: {
          equals: templateData.title,
          mode: 'insensitive',
        }
      }
    });

    if (!existing) {
      const created = await prisma.template.create({
        data: templateData
      });
      console.log(`[DIBUAT] Template: ${created.title}`);
    } else {
      console.log(`[DILEWATI] Template '${templateData.title}' sudah ada di database.`);
    }
  }
  console.log('Seeding selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
