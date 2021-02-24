import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ShardingModule } from './sharding/sharding.module';
import { PmtMiddleware } from './sharding/sharding.middleware';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
    }),
    UserModule,
    ShardingModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PmtMiddleware).forRoutes('*');
  }
}
