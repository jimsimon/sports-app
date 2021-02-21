import {
  Controller,
  Get,
  Req,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { Request } from 'express';
import { PMT, PrismaClient } from '@prisma-multi-tenant/client';
import { sample } from 'lodash';

@Controller('provision')
export class ProvisionController {
  constructor(@Inject(PMT) private prisma: PrismaClient) {}

  @Get()
  async create(@Req() request: Request): Promise<string> {
    const name = request.subdomains.length
      ? request.subdomains.join('-')
      : 'ROOT';

    const tenant = await this.prisma.tenant.findUnique({
      where: {
        name,
      },
    });

    if (tenant) {
      return `${name} has already been provisioned`;
    }

    const hosts = Object.keys(process.env).reduce((hosts, envVar) => {
      if (envVar.endsWith('_DATABASE_URL')) {
        hosts.push(envVar.replace('_DATABASE_URL', ''));
      }
      return hosts;
    }, [] as string[]);

    if (!hosts.length) {
      throw new InternalServerErrorException('No hosts defined in environment');
    }

    await this.prisma.tenant.create({
      data: {
        name,
        host: sample(hosts),
      },
    });

    return `Successfully provisioned ${name}`;
  }
}
