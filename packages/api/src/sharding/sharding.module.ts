import { Module } from '@nestjs/common';
import { PmtMiddleware } from './sharding.middleware';
import { PrismaClientFactory, prismaFactory } from './prisma-client.factory';
import { ProvisionController } from './provision.controller';
import { PrismaClient } from '@prisma/client';
import { PrismaClient as PMTClient } from '@prisma-multi-tenant/client';
import { ConfigModule } from '@nestjs/config';
import { pmtNestJsFactory } from '@prisma-multi-tenant/client';

@Module({
  imports: [ConfigModule],
  providers: [
    PmtMiddleware,
    prismaFactory,
    PrismaClientFactory,
    pmtNestJsFactory,
  ],
  controllers: [ProvisionController],
  exports: [PrismaClient, PmtMiddleware, PrismaClientFactory, PMTClient],
})
export class ShardingModule {}
