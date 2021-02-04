import { Module } from '@nestjs/common';
import { AppController } from './controllers/app/app.controller';
import { AppService } from './services/app.service';
import { ProvisionController } from './controllers/provision/provision.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppContext } from './resolvers/context';
import { getPrismaTenant } from './sharding/graphql-context';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { UserResolver } from './resolvers/user-resolver';

function getUser(req: express.Request): User {
  const header = req.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    return jwt.verify(token, 'supersecret') as User;
  }

  return null;
}

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      context: async ({ req }): Promise<AppContext> => {
        const prisma = await getPrismaTenant(req);
        const user = getUser(req);

        return {
          user: null,
          prisma,
        };
      },
    }),
  ],
  controllers: [AppController, ProvisionController],
  providers: [AppService, UserResolver],
})
export class AppModule {}
