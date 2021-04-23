#!/usr/bin/env node

import { program } from 'commander';
import { MigrationType, PmtService } from './pmt-service';
import { PrismaClient } from '@prisma-multi-tenant/client';

const prisma = new PrismaClient({
  log: ['query'],
});
const pmtService = new PmtService(prisma);

program.command('init').action(pmtService.init);

const newCmd = program.command('new');
newCmd.command('tenant <name> <host>').action((name, host) => {
  return pmtService.newTenant(name, host);
});

const deleteCmd = program.command('delete');
deleteCmd.command('tenant <tenants...>').action((tenants) => {
  return pmtService.deleteTenants(...tenants);
});

const migrate = program.command('migrate');
migrate.command('deploy [tenants...]').action((tenants) => {
  return pmtService.migrate(MigrationType.DEPLOY, ...tenants);
});

migrate.command('dev [tenants...]').action((tenants) => {
  return pmtService.migrate(MigrationType.DEV, ...tenants);
});

program.command('list').action(pmtService.list);

program
  .parseAsync(process.argv)
  .catch(console.error)
  .finally(() => {
    return prisma.$disconnect();
  });
