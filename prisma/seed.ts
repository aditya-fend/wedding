// prisma/seed.ts
import { prisma } from '@/lib/prisma';

async function main() {
  console.log('🌱 Seeding templates...');

  const templates = [
    {
      name: "Elegant Minimal",
      slug: "elegant-minimal",
      description: "Desain minimalis elegan dengan sentuhan mewah",
      thumbnail: "https://picsum.photos/id/1015/600/400",
      category: "modern",
      isPremium: false,
      features: {
        background: "gradient",
        music: true,
        gallery: true,
        rsvp: true,
      },
    },
    {
      name: "Classic Romance",
      slug: "classic-romance",
      description: "Nuansa klasik dengan detail bunga dan kaligrafi",
      thumbnail: "https://picsum.photos/id/102/600/400",
      category: "classic",
      isPremium: false,
      features: {
        background: "image",
        music: true,
        gallery: true,
        rsvp: true,
      },
    },
    {
      name: "Luxury Gold",
      slug: "luxury-gold",
      description: "Desain premium dengan aksen emas dan detail mewah",
      thumbnail: "https://picsum.photos/id/106/600/400",
      category: "luxury",
      isPremium: true,
      features: {
        background: "video",
        music: true,
        gallery: true,
        rsvp: true,
        story: true,
      },
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: template,
    });
  }

  console.log('✅ Templates seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });