/* eslint-disable no-mixed-operators */

import { IResolvers } from "@graphql-tools/utils";
import { Redis } from "ioredis";
import { IKeyword, IResultKeyword } from "../../config/constant";
import {LEVEL_KEYWORD} from '../../config/constant'

export const resolvers:IResolvers = {
    Query:{
      async emailTemplateById(parent, args,ctx){
        const result:any={
          status:200,
          message:"Success"
        }
        try {
          const {dataSource,user,logger} = ctx
          const {Teamplate} = dataSource()
          const emailTemplate = await Teamplate.findOneById(args._id)
          result.data = emailTemplate
        } catch (error) {
          result.status =400
          result.message = error.message
        }
        return result     
    },
    async emailTemplateByIds(parent,args,ctx){
      const result:any={
        status:200,
        message:"Success"
      }
      try {
        const {dataSource,user,logger} = ctx
        const {Teamplate} = dataSource()
        const emailTemplate = await Teamplate.findManyByIds(args._id)
        result.data = emailTemplate
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