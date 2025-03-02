import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloGateway, IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import jwt from 'jsonwebtoken'
import { createAccessToken, createRefreshToken, getTokenFromRequest,setHeader } from './util/token';
import { Redis } from 'ioredis';
const redis = new Redis()
import delay from 'delay';
// A map of functions which return data for the schema.
require('dotenv').config()

const app = express();
const accessTokenSerect = process.env.JWT_ACCESS_TOKEN_SECRECT || ''
const refreshTokenSerect = process.env.JWT_JWT_REFRESH_TOKEN_SERECT || ''
const TTL_ACESSTOKEN = parseInt(process.env.JWT_EXPIESIN ||'86000',10) -1
const TTL_REFRESHTOKEN = parseInt(process.env.JWT_EXPIESIN ||'860000',10) -1
const startServer = async()=>{
  app.use(async (req:any,res,next)=>{
    const token = getTokenFromRequest(req.headers)
    jwt.verify(token,accessTokenSerect,async(err:any,decoded:any)=>{
      if(decoded){
        req.token = true
        // setHeader(res,true)
        next()
        return
      }else{
        req.token = false
        // setHeader(res,false)
        next()
        return
      }
    })
  })
  const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: 'keyword', url: 'http://localhost:4001/graphql' }
        // ...additional subgraphs...
      ],
    }),    
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url,
        async willSendRequest({ request, context }:any) {
          const token = context.req  
          request.http.headers.set('token',token ? JSON.stringify(token):null)
          },
      })
    },
   
    });
    const server = new ApolloServer({
      gateway
    });
    await server.start();
    app.use(
      '/graphql',
      json(),
      expressMiddleware(server, { 
        context: async ({ req,res }:any) =>{ 
          return {
            res,
            req:req.token
          }
        },
      }),
    );
    console.log('http://localhost:5000/graphql')
  }


startServer()


export default app

