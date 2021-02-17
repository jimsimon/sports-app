import { Request, Response, NextFunction } from 'express';
import { asyncLocalStorage } from './async-local-storage';
// import { MultiTenant } from '@prisma-multi-tenant/client'
import { PrismaClient } from '@prisma/client';

// const multiTenant = new MultiTenant<PrismaClient>()

export async function expressMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const name = req.subdomains.length ? req.subdomains.join('-') : 'ROOT'
  // const tenant = await multiTenant.get(name)
  //
  // asyncLocalStorage.run({tenant}, next)
}
