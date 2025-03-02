import { IResolvers } from "@graphql-tools/utils";
import { Password } from "../util/password";
import Validator, { ValidationError } from 'fastest-validator'
import { GraphQLError } from "graphql";
import { IResultAuthdoc, IResultdoc } from "../config/constant";
import { createAccessToken, createRefreshToken } from "../util/token";
import { Redis } from "ioredis";
import { DataSource } from "apollo-datasource";
import { generate } from "generate-password";
import { isValidObjectId } from "mongoose";
const cacheAuth = 'auth'
import { USER_ROLE } from "../config/constant";
require('dotenv').config()

const accessTokenSerect = process.env.JWT_ACCESS_TOKEN_SECRECT || ''
const refreshTokenSerect = process.env.JWT_JWT_REFRESH_TOKEN_SERECT || ''
const TTL_ACESSTOKEN = parseInt(process.env.JWT_EXPIESIN ||'86000',10) -1
const TTL_REFRESHTOKEN = parseInt(process.env.JWT_EXPIESIN ||'860000',10) -1
const redis = new Redis({
  port: 6379,
  host: "127.0.0.1", 
}
 )
export const resolvers:IResolvers = {
    Query:{
      async me(parent, args,ctx){
        const {user,dataSource} = ctx
        const {User} = dataSource()
        const result:IResultdoc = {
          message:'Success',
          status:200
        }
        try {
          if(!user._id) throw Error('Cannot authenticate user')
          const doc = await User.collection.findById(user._id)
          result.data = doc

        } catch (err) {
          result.message = err.message
          result.status = 400
        }
        return result
      }
    },
    Mutation: {
      async createUser(parent, args,ctx){
          const {user,dataSource} = ctx
          const {User} = dataSource()
          const result:IResultdoc = {
            message:'Success',
            status:200
          }
          try {
            const {password,username,email,...info} = args.input
            const v = new Validator()
            const schemaValidator = {
              username:{type:"string"},
              email:{type:"email"}
            }
            const check = v.compile(schemaValidator)
            const checkValidator = await check({username,email})
            if(typeof checkValidator!='boolean'){
              throw new GraphQLError('Check',{
                extensions:{code:403,detail:checkValidator}
              })
            }
            const existingUser = await User.collection.exists({
              $or:[{username},{email}]
            })
            if(existingUser){
              throw new GraphQLError('Username or Email already used',{
                extensions:{code:403,detail:''}
              })
            }
            const hashPassowrd = await Password.toHash(password)
            const newUser = await User.create({...info,password:hashPassowrd,username,email,isActive:true},123)
            result.data = newUser
          } catch (err) {
            result.message = err.message
            result.status = 400
          }
        
          return result
      },
      async login(parent,args,ctx){
        const {user,dataSource} = ctx
        const {User} = dataSource()

        const result:IResultAuthdoc = {
          message:'Success',
          status:200
        }
        try {
            const {username,password} = args.input
            const existingUser = await User.collection.findOne({
            $or:[{username},{email:username}]
            })
        
            if(!existingUser){
            throw new Error('Not User Found')
            }
            const valid = await Password.comparePassword(existingUser.password!,password)
            console.log(valid)
            if(!valid){
            throw new Error('Error Passowrd')
            }
            // if(!existingUser.isActive){
            // throw new Error('active user is false')
            // }
            const accessToken = await createAccessToken(existingUser)
            const refreshToken = await createRefreshToken(existingUser)
            const id_user = existingUser._id.toString()   
            const doc = await User.update({
            _id:id_user,
            accessToken,
            refreshToken
            },123)
            const cacheAccessToken = `${cacheAuth}:${id_user}:accessToken:${accessToken}`
            const cacheRefreshToken = `${cacheAuth}:${id_user}:refreshToken:${refreshToken}`
            await redis.set(cacheAccessToken,"true","EX", TTL_ACESSTOKEN)
            await redis.set(cacheRefreshToken,"true","EX", TTL_REFRESHTOKEN)
            result.accessToken = accessToken
            result.refreshToken = refreshToken
          
        } catch (err) {
            result.message = err.message
            result.status = 400
        }
        return result
        
      },
      async logout(parent,args,ctx){
        const {user,dataSource} = ctx
        const {User} = dataSource
        const {accesstoken,refreshtoken}  = user
        const result:IResultAuthdoc = {
            message:'Success',
            status:200
        }
        try {
            const cacheAccessToken = `auth:${user._id}:accessToken:${accesstoken}`
            const cacheRefreshToken = `auth:${user._id}:refreshToken:${refreshtoken}`
            redis.del(cacheAccessToken)
            redis.del(cacheRefreshToken)
            User.update({
              accessToken:null,
              refreshToken:null
            })
        } catch (err) {
            result.message = err.message
            result.status = 400
        }
        return result

        
      },
      async changePassword(parent,args,ctx){
        const {user,dataSource} = ctx
        const {User} = dataSource()
        const result:IResultAuthdoc = {
            message:'Success',
            status:200
        }
        try {
            const {oldPassword,newPassword} = args.input
            // const {accesstoken,refreshtoken}  = user
            // const cacheAccessToken = `auth:${user._id}:accessToken:${accesstoken}`
            // const cacheRefreshToken = `auth:${user._id}:refreshToken:${refreshtoken}`
            const existingUser = await User.collection.findOne({_id:user._id})
            const comparePassword = await Password.comparePassword(existingUser.password!,oldPassword)
            console.log(comparePassword)
            if(!comparePassword){
              throw new Error('sai mat khau')
            }
            const hashPassowrd = await Password.toHash(newPassword)
            console.log(hashPassowrd)
            await User.update({_id:user._id,password:hashPassowrd},123)
        } catch (err) {
            result.message = err.message
            result.status = 400
        }
        return result

        // const existingUser = await User.collection.findOne({
        //   $or:[{user.username},{email:user.username}]
        // }) 
      },
      // async forgotPassword(parent,args,ctx){
      //   const {user,dataSource} = ctx
      //   const {User} = dataSource()
      //   const email = args.input
      //   const existingUser = await User.collection.findOne({email})
      //   if(!existingUser){
      //     throw new Error('Uer is not exits')
      //   }
      //   const passCode = generate({
      //     length:10,
      //     numbers:true
      //   })
      //   const {_id,lastName,firstName,username} = existingUser
      //   const cacheKey = `passcode:${_id}`
      //   const passCodeCached = await redis.get(cacheKey)
      //   if(!passCodeCached){
      //     await redis.set(cacheKey,passCode,"EX",30)
      //   }
      // },
      // async updateForgotPassword(parent,args,ctx){
      //   const {user,dataSource} = ctx
      //   const {User} = dataSource()
      //   const {userId,passCode,newPassword} = args.input
      //   const cacheKey = `passcode:${userId}`
      //   const getPasscode = redis.get(cacheKey)
      //   if(!getPasscode||getPasscode!=passCode){
      //     throw new Error('Invalid Pass Code')
      //   }
      //   const hashPassowrd = Password.toHash(newPassword)
      //   const doc = await User.update({
      //     _id:userId,
      //     password:hashPassowrd
      //   })
      //   const cacheToken = `${cacheAuth}:${userId}:*`
      //   let stream =  redis.scanStream({match:cacheToken,count: 100})
      //   stream.on('data',(resultKeys)=>{
      //     if(resultKeys.length){
      //       const pipeline = redis.pipeline()
      //       for (var i = 0; i < resultKeys.length; i++) {
      //         pipeline.del(resultKeys[i])
      //       }
      //       pipeline.exec()
      //     }
      //   })
      //   stream.on('end', function () {
      //     console.log('all keys have been visited');
      //   });
        

      // },
      // async updateUser(parent,args,ctx){
      //   const {user,dataSource} = ctx
      //   const {User} = dataSource()
      //   const updateUser = args.input
      //   const permisson = Object.values(USER_ROLE)
      //   const permissonUser = permisson.indexOf(user.permission)
      //   const uselonhonpermission = permisson.splice(permissonUser+1,permisson.length)
      //   updateUser.map(async({_id,permission,isActive}:any)=>{
      //     if(!isValidObjectId(_id)){
      //       return
      //     }
      //     if(!uselonhonpermission.includes(permission)){
      //       console.log('co thang pha ne')
      //       return 
      //     }
      //     const cacheToken = `${cacheAuth}:${_id}:*`
      //     let stream =  redis.scanStream({match:cacheToken,count: 100})
      //     stream.on('data',(resultKeys)=>{
      //       if(resultKeys.length){
      //         const pipeline = redis.pipeline()
      //         for (var i = 0; i < resultKeys.length; i++) {
      //           pipeline.del(resultKeys[i])
      //         }
      //         pipeline.exec()
      //       }
      //     })
      //     stream.on('end', function () {
      //       console.log('all keys have been visited');
      //     });
      //      await User.update({
      //       _id,
      //       permission,
      //       isActive
      //     })
      //   })
      // }

    }
   
}