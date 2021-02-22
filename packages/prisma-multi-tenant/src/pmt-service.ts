import { spawnSync } from 'child_process';
import path from 'path';
import { PrismaClient, Tenant } from '@prisma-multi-tenant/client';

export enum MigrationType {
  DEV = 'dev',
  DEPLOY = 'deploy',
}

export class PmtService {
  init() {
    const pmtClientPath = require.resolve('@prisma-multi-tenant/client');
    spawnSync(
      'prisma',
      [
        'migrate',
        'deploy',
        '--preview-feature',
        '--schema',
        path.join(path.dirname(pmtClientPath), '/prisma/schema.prisma'),
      ],
      {
        cwd: process.cwd(),
        stdio: 'inherit',
      },
    );
  }

  async newTenant(name: string, host: string) {
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
  }

  async migrate(migrationType: MigrationType, ...tenantNames: string[]) {
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
      spawnSync('prisma', ['migrate', migrationType, '--preview-feature'], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env: {
          ...process.env,
          DATABASE_URL,
        },
      });
    });
  }

  async list() {
    const prisma = new PrismaClient();
    try {
      console.log(await prisma.tenant.findMany());
    } finally {
      await prisma.$disconnect();
    }
  }
}
