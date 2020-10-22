import { AsyncLocalStorage } from 'async_hooks';
import {PrismaClient} from '@prisma/client';

export interface ShardStorage {
  tenant: PrismaClient
}
export const asyncLocalStorage = new AsyncLocalStorage<ShardStorage>();
