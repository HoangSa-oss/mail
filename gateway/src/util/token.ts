import jwt from 'jsonwebtoken'
require('dotenv').config()
const accessTokenSerect = process.env.JWT_ACCESS_TOKEN_SECRECT || ''
const refreshTokenSerect = process.env.JWT_JWT_REFRESH_TOKEN_SERECT || ''
const TTL_ACESSTOKEN = parseInt(process.env.JWT_EXPIESIN ||'86000',10) -1
const TTL_REFRESHTOKEN = parseInt(process.env.JWT_EXPIESIN_REFRESH ||'860000',10) -1
interface IUser{
    _id:string
    username:string
    password:string
    email:string
    firstName?:string
    lastName?:string
    permission?:string
    status?:string
    accessToken?:string
    refreshToken?:string
    createBy:string
    createAt:Date
    updateBy?:string
    updateAt?:Date
}
export const createAccessToken = async()=>{
    return jwt.sign({},accessTokenSerect,{
        expiresIn:TTL_ACESSTOKEN
    })
}
export const createRefreshToken = async({_id,username,permission}:IUser)=>{
    return jwt.sign({_id,username,permission},refreshTokenSerect,{
        expiresIn:TTL_REFRESHTOKEN
    })
}
export const setHeader = (res: any, token: boolean) => {
    res.set('Access-Control-Expose-Headers', 'token');
    res.set('token', token);
};
export const getTokenFromRequest = (headers: any) => {
    const { 'token': token } = headers;
    return token;
  };