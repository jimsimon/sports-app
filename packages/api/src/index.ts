import 'reflect-metadata'
import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import jwt from 'jsonwebtoken'
import {MultiTenant} from '@prisma-multi-tenant/client';
import {getPrismaTenant} from './sharding/graphql-context';
import { buildSchema } from 'type-graphql'
import {UserResolver} from "./resolvers/user-resolver";
import {Context} from "./resolvers/context";
import * as path from 'path';
import { User } from "@prisma/client";

function getUser(req: express.Request): User {
  const header =  req.headers.authorization;

  if (header){
    const token = header.replace('Bearer ', '');
    return jwt.verify(token, 'supersecret') as User;
  }

  return null
}

async function start() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  })
  const server = new ApolloServer({
    schema,
    playground: true,
    context: async ({req}): Promise<Context> => {
      const prisma = await getPrismaTenant(req)
      const user = getUser(req)

      return {
        user: null,
        prisma
      }
    }
  });

  const app = express()
  app.get('/provision', async (request, response) => {
    const name = request.subdomains.length ? request.subdomains.join('-') : 'ROOT'
    const url = `${process.env.MANAGEMENT_URL}?schema=${name}`

    const multiTenant = new MultiTenant()
    try {
      await multiTenant.createTenant({
        name,
        url
      })
    } catch (e) {
      return response.status(500).send(e)
    }
    return response.send(`Successfully provisioned ${name}`)
  })

  server.applyMiddleware({app});

  app.listen({port: 3000}, () =>
    console.log(`🚀 Server ready at http://${process.env.VIRTUAL_HOST}${server.graphqlPath}`)
  )
}

start().catch(console.error)
