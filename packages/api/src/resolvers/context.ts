import { PrismaClient, User } from '@prisma/client';

export type AppContext = {
  prisma: PrismaClient;
  user: User;
};
