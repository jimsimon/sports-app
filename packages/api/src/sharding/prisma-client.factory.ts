import { Inject, InternalServerErrorException, Scope } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PMT, PrismaClient as PMTClient } from '@prisma-multi-tenant/client';
import { PrismaClient } from '@prisma/client';

const prismaMap = new Map<string, PrismaClient>();

@Injectable({ scope: Scope.REQUEST })
export class PrismaClientFactory {
  private _subdomains: string[];

  constructor(
    private configService: ConfigService,
    @Inject(PMT) private pmtPrisma: PMTClient,
  ) {}

  set subdomains(value: string[]) {
    this._subdomains = value;
  }

  async getPrismaClient(): Promise<PrismaClient> {
    const name = this._subdomains.length ? this._subdomains.join('-') : 'ROOT';

    let prisma = prismaMap.get(name);
    if (!prisma) {
      const tenant = await this.pmtPrisma.tenant.findUnique({
        where: {
          name,
        },
      });

      if (!tenant) {
        throw new InternalServerErrorException(
          `No tenant found for ${name}. Did you forget to provision?`,
        );
      }

      let url = this.configService.get(`${tenant.host}_DATABASE_URL`);
      if (!url) {
        throw new InternalServerErrorException(
          `No connection string found for tenant: ${name}`,
        );
      }
      url = `${url}?schema=${name}`;

      prisma = new PrismaClient({
        datasources: {
          db: {
            url,
          },
        },
      });

      prismaMap.set(name, prisma);
    }

    return prisma;
  }
}

export const prismaFactory = {
  provide: PrismaClient,
  useFactory: async (prismaClientFactory: PrismaClientFactory) => {
    return prismaClientFactory.getPrismaClient();
  },
  inject: [PrismaClientFactory],
};
