import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import {typeDefs} from './auth/typeDef';
import { resolvers } from './auth/resolver';
import generateDataSource from './datasource/index'
import { buildSubgraphSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';
import permission from './auth/acl'
// A map of functions which return data for the schema.

const dataSource =()=>({
  ...generateDataSource
})
const app = express();
const getUser = async(req:any)=>{
  const user = req.headers.user ? JSON.parse(req.headers.user) : null
  return user
}
const server = new ApolloServer({
    schema:applyMiddleware(
      buildSubgraphSchema([{
        typeDefs,
        resolvers, 
      }]as any),
      permission
    ),
    formatError: (formattedError, error) => {
      return {
        message:formattedError.message,
        status:formattedError.extensions!.code,
        detail:formattedError!.extensions!.detail,
        locations:formattedError!.locations,
        path:formattedError.path,
        extensions:formattedError.extensions
      }
    }
  }
);
const startServer = async()=>{
  await server.start();
  app.use(
    '/graphql',
    json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(server,{
      context: async ({ req }) => {
        const user = await getUser(req)
        return {
         user: user,
         dataSource
        }
      }      
    }),
  );
}
startServer()

export default app





