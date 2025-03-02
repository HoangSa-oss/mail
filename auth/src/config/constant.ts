export enum USER_ROLE {
    ADMIN = "admin",
    MANAGER="manager",
    LEADER="leader",
    MEMBER="member"
}
export enum USER_STATUS {
    ACTIVE="active",
    DEACTIVE="deactive"
}
export interface IResultdoc{
    message:string
    status:number
    data?:IUser
}
export interface IResultAuthdoc{
    message:string
    status:number
    accessToken?:string
    refreshToken?:string
    data?:IUser
}
export interface IUser{
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
