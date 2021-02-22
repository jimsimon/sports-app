#!/usr/bin/env node

import { program } from 'commander';
import { MigrationType, PmtService } from './pmt-service';

const pmtService = new PmtService();

program.command('init').action(pmtService.init);

const newCmd = program.command('new');
newCmd.command('tenant <name> <host>').action(pmtService.newTenant);

const migrate = program.command('migrate');
migrate.command('deploy [tenants...]').action((tenants) => {
  return pmtService.migrate(MigrationType.DEPLOY, ...tenants);
});

migrate.command('dev [tenants...]').action((tenants) => {
  return pmtService.migrate(MigrationType.DEV, ...tenants);
});

program.command('list').action(pmtService.list);

program.parseAsync(process.argv).catch(console.error);
