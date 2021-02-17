#!/usr/bin/env node

import { spawnSync } from 'child_process';
import { program } from 'commander';
import path from 'path';
import { PrismaClient, Tenant } from '@prisma-multi-tenant/client';

program.command('init').action(() => {
  const pmtClientPath = require.resolve('@prisma-multi-tenant/client');
  spawnSync(
    'prisma',
    [
      'migrate',
      'dev',
      '--preview-feature',
      '--preview-feature',
      '--schema',
      path.join(path.dirname(pmtClientPath), '/prisma/schema.prisma'),
    ],
    {
      cwd: process.cwd(),
      stdio: 'inherit',
    },
  );
});

const newCmd = program.command('new');
newCmd
  .command('tenant <name> <host>')
  .action(async (name: string, host: string) => {
    const prisma = new PrismaClient();
    try {
      await prisma.tenant.create({
        data: {
          host,
          name,
        },
      });
    } finally {
      await prisma.$disconnect();
    }
  });

program
  .command('migrate [tenants...]')
  .action(async (tenantNames: string[]) => {
    const pmtClientPath = require.resolve('@prisma-multi-tenant/client');
    spawnSync(
      'prisma',
      [
        'migrate',
        'dev',
        '--preview-feature',
        '--schema',
        path.join(path.dirname(pmtClientPath), '/prisma/schema.prisma'),
      ],
      {
        cwd: process.cwd(),
        stdio: 'inherit',
      },
    );

    spawnSync('prisma', ['generate'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    const prisma = new PrismaClient();
    let tenants;
    try {
      tenants = await prisma.tenant.findMany({
        where: {
          name: {
            in: tenantNames.length ? tenantNames : undefined,
          },
        },
      });
    } finally {
      await prisma.$disconnect();
    }

    tenants.forEach((tenant: Tenant) => {
      const hostEnvironmentVariable = `${tenant.host}_DATABASE_URL`;
      const DATABASE_URL = `${process.env[hostEnvironmentVariable]}?schema=${tenant.name}`;
      spawnSync('prisma', ['migrate', 'dev', '--preview-feature'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: {
          ...process.env,
          DATABASE_URL,
        },
      });
    });
  });

program.parseAsync(process.argv).catch(console.error);

// program.command('list').action(() => {});
//
// program.command('new <tenant> <alias>').action(() => {});
//
// program.command('migrate <tenant> <cmd>').action(() => {});
