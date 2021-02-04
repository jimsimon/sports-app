import { Request } from 'express';
import { MultiTenant } from '@prisma-multi-tenant/client';
import { PrismaClient } from '@prisma/client';

const multiTenant = new MultiTenant<PrismaClient>();

export async function getPrismaTenant(req: Request): Promise<PrismaClient> {
  const name = req.subdomains.length ? req.subdomains.join('-') : 'ROOT';
  return await multiTenant.get(name);
}
