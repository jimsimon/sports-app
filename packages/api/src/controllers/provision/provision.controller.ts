import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { MultiTenant } from '@prisma-multi-tenant/client';

@Controller('provision')
export class ProvisionController {
  @Get()
  async create(@Req() request: Request): Promise<string> {
    const name = request.subdomains.length
      ? request.subdomains.join('-')
      : 'ROOT';
    const url = `${process.env.MANAGEMENT_URL}?schema=${name}`;

    const multiTenant = new MultiTenant();
    try {
      await multiTenant.createTenant({
        name,
        url,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return `Successfully provisioned ${name}`;
  }
}
