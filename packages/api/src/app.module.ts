import {
  Injectable,
  InternalServerErrorException,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app.service';
import { ProvisionController } from './controllers/provision/provision.controller';
import { GraphQLModule } from '@nestjs/graphql';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserResolver } from './resolvers/user-resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  pmtNestJsFactory,
  PrismaClient as PmtClient,
} from '@prisma-multi-tenant/client';
import { PrismaClient } from '@prisma/client';
import { Scope } from '@nestjs/common';
import { Request } from 'express';

function getUser(req: express.Request): User {
  const header = req.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    return jwt.verify(token, 'supersecret') as User;
  }

  return null;
}

const pmtPrisma = new PmtClient();
const prismaMap = new Map<string, PrismaClient>();

@Injectable({ scope: Scope.REQUEST })
class PrismaClientFactory {
  private _subdomains: string[];

  constructor(private configService: ConfigService) {}

  set subdomains(value: string[]) {
    this._subdomains = value;
  }

  async getPrismaClient(): Promise<PrismaClient> {
    const name = this._subdomains.length ? this._subdomains.join('-') : 'ROOT';

    let prisma = prismaMap.get(name);
    if (!prisma) {
      const tenant = await pmtPrisma.tenant.findUnique({
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

@Injectable()
export class PmtMiddleware implements NestMiddleware {
  constructor(private prismaClientFactory: PrismaClientFactory) {}

  use(req: Request, res: any, next: () => void) {
    this.prismaClientFactory.subdomains = req.subdomains;
    next();
  }
}

const prismaFactory = {
  provide: PrismaClient,
  useFactory: async (prismaClientFactory: PrismaClientFactory) => {
    return prismaClientFactory.getPrismaClient();
  },
  inject: [PrismaClientFactory],
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
  ],
  controllers: [AppController, ProvisionController],
  providers: [
    AppService,
    UserResolver,
    pmtNestJsFactory,
    PrismaClientFactory,
    prismaFactory,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PmtMiddleware).forRoutes('*');
  }
}
