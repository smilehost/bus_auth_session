import { PrismaClient as PrismaAuth } from '../generated/prisma/auth_client';
import { PrismaClient as PrismaMass } from '../generated/prisma/mass_client';

const prismaAuth = new PrismaAuth();
const prismaMass = new PrismaMass();

export { prismaAuth, prismaMass };