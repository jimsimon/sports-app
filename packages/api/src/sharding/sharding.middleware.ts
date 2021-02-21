import { PrismaClientFactory } from './prisma-client.factory';
import { Request } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PmtMiddleware implements NestMiddleware {
  constructor(private prismaClientFactory: PrismaClientFactory) {}

  use(req: Request, res: any, next: () => void) {
    this.prismaClientFactory.subdomains = req.subdomains;
    next();
  }
}
