import { spawnSync } from 'child_process';
import path from 'path';
import { PrismaClient, Tenant } from '@prisma-multi-tenant/client';

export enum MigrationType {
  DEV = 'dev',
  DEPLOY = 'deploy',
}

export class PmtService {
  constructor(private prisma: PrismaClient) {}

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
    await this.prisma.tenant.create({
      data: {
        host,
        name,
      },
    });
  }

  async deleteTenants(...names: string[]) {
    for (const name of names) {
      // TODO: Figure out a safer way to inject the schema name :-/
      await this.prisma.$executeRaw(`DROP SCHEMA IF EXISTS ${name} CASCADE`);
      await this.prisma.tenant.deleteMany({
        where: {
          name: {
            in: name,
          },
        },
      });
    }
  }

  async migrate(migrationType: MigrationType, ...tenantNames: string[]) {
    const tenants = await this.prisma.tenant.findMany({
      where: {
        name: {
          in: tenantNames.length ? tenantNames : undefined,
        },
      },
    });

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
    console.log(await this.prisma.tenant.findMany());
  }
}
