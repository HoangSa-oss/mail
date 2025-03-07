/* eslint-disable no-mixed-operators */

import { IResolvers } from "@graphql-tools/utils";
import { Redis } from "ioredis";
import { IKeyword, IResultKeyword } from "../../config/constant";
import {LEVEL_KEYWORD} from '../../config/constant'

export const resolvers:IResolvers = {
    Query:{
      async emailGroupById(parent, args,ctx){
        const result:any={
          status:200,
          message:"Success"
        }
        try {
          const {dataSource,user,logger} = ctx
          const {Email} = dataSource()
          const emailGroup = await Email.findOneById(args._id)
          result.data = emailGroup
        } catch (error) {
          result.status =400
          result.message = error.message
        }
        return result     
    },
    async emailGroupByIds(parent, args,ctx){
      const result:any={
        status:200,
        message:"Success"
      }
      try {
        const {dataSource,user,logger} = ctx
        const {Email} = dataSource()
        const emailGroup = await Email.findManyByIds(args._id)
        result.data = emailGroup
      } catch (error) {
        result.status =400
        result.message = error.message
      }
      return result     
    },
    },
    Mutation:{
      
    }
   
   
}