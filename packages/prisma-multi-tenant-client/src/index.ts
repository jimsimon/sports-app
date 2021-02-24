import { PrismaClient } from './client';

export * from './client';

export const PMT = Symbol();

export const pmtNestJsFactory = {
  provide: PMT,
  useClass: PrismaClient,
};
