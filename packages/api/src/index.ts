import { ApolloServer, gql } from 'apollo-server-express'
import express from 'express'
import { expressMiddleware } from './sharding/express-middleware'
import { container } from "./container";
import { PrismaClient } from '@prisma/client';
import { MultiTenant } from '@prisma-multi-tenant/client';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express()
app.use('/api/', expressMiddleware)
app.get('/api', async (request, response) => {
  const client = container.get(PrismaClient)
  const result = await client.site.findMany()
  response.send(result)
})
app.get('/provision', async (request, response) => {
  const name = request.subdomains.length ? request.subdomains.join('-') : 'ROOT'
  console.log('name: '+name)
  const url = `${process.env.MANAGEMENT_URL}?schema=${name}`
  console.log(`url: ${url}`)

  //TODO: Use management to create tenant then run migration manually using correct cwd
  const multiTenant = new MultiTenant()
  try {
    const result = await multiTenant.createTenant({
      name,
      url
    })
    console.log(result)
  } catch (e) {
    console.error(e)
    return response.send(e)
  }
  return response.send(`Successfully provisioned ${name}`)
})

server.applyMiddleware({ app });

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://${process.env.VIRTUAL_HOST}${server.graphqlPath}`)
)
