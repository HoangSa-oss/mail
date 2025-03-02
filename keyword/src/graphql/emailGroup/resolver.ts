/* eslint-disable no-mixed-operators */

import { IResolvers } from "@graphql-tools/utils";
import { Redis } from "ioredis";
import { IKeyword, IResultKeyword } from "../../config/constant";
import {LEVEL_KEYWORD} from '../../config/constant'

export const resolvers:IResolvers = {
    Query:{
      async emailGroupById(parent, args,ctx){
        const resultKeyword:IResultKeyword={
          status:200,
          message:"Success"
        }
        const {dataSource,user,logger} = ctx
          
    },
    },
    Mutation:{
     
    }
   
   
}