import { IUser } from "../config/constant";
require('dotenv').config()


const accessTokenSerect = process.env.JWT_ACCESS_TOKEN_SECRECT || ''
const refreshTokenSerect = process.env.JWT_JWT_REFRESH_TOKEN_SERECT || ''
const TTL_ACESSTOKEN = parseInt(process.env.JWT_EXPIESIN ||'86000',10) -1
const TTL_REFRESHTOKEN = parseInt(process.env.JWT_EXPIESIN_REFRESH ||'860000',10) -1
import jwt from 'jsonwebtoken'
export const createAccessToken = async({_id,username,permission,status}:IUser)=>{
    const createAccessToken =  jwt.sign({_id,username,permission,status},accessTokenSerect
    ,{
        expiresIn:TTL_ACESSTOKEN
    }
    )
    return createAccessToken
} 
export const createRefreshToken = async({_id,username,permission}:IUser)=>{

    const createAccessToken =  jwt.sign({_id,username,permission},refreshTokenSerect
    ,{
        expiresIn:TTL_REFRESHTOKEN
    }
    )
    return createAccessToken
} 