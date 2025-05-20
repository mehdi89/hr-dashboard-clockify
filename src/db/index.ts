import { PrismaClient } from '../generated/prisma';

// Add prisma to the NodeJS global type
declare global {
  var prisma: PrismaClient | undefined;
}

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

// Initialize Prisma Client (singleton pattern)
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

// Helper function to check database connection
export async function checkConnection() {
  try {
    await prisma.$connect();
    const result = await prisma.$queryRaw`SELECT NOW()`;
    return { success: true, timestamp: (result as any)[0]?.now };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
