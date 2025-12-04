import { PrismaClient as PrismaAuth } from './generated/prisma/auth_client';
import { PrismaClient as PrismaMass } from './generated/prisma/mass_client';

const prisma = new PrismaAuth();
const prismaMass = new PrismaMass();
async function main() {
    await prisma.service.create({
        data: {
            service_name: 'test_service',
            callback_url: 'https://example.com/callback'
        }
    });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
