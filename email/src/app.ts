import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import emailGroup from './graphql/emailGroup';
import generateDataSource from './datasource/index'
import { buildFederatedSchema, buildSubgraphSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';
import  Logger from './external-libs/logger'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import permission from './rule/acl'
import schema from  './graphql'
// import permission from './auth/acl'
// A map of functions which return data for the schema.

const dataSource =()=>({
  ...generateDataSource
})

const app = express();
const getToken = async(req:any)=>{
  const token = req.headers.token ? JSON.parse(req.headers.token) : null
  return token
}
// const  resolvers = mergeResolvers([emailGroup.resolvers])
// const typeDefs = mergeTypeDefs([emailGroup.typeDefs])
// const logger = new Logger({route_name:"emailGroup"})
const server = new ApolloServer({
    schema
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
        const token = await getToken(req)
        return {
         token: token,  
         dataSource:dataSource,
        }
      }      
    }),
  );
}
startServer()

export default app

