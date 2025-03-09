/* eslint-disable no-mixed-operators */

import { IResolvers } from "@graphql-tools/utils";
import { Redis } from "ioredis";


export const resolvers:IResolvers = {
    Query:{
    },
    Mutation:{
      async sendEmailMessage(parent, args,ctx) {
        const result = {
          status: 200,
          message: 'Created success',
          data: null
        };
        const { subject, html, emails, type, domain } = args;
        const newContent = html;

      }
    }
   
   
}