export const DOMAIN_TYPE = {
    RADAA: 'radaa',
    KOMPA: 'kompa',
    REPORT247: 'report247'
};
export const SHARED_STATUS = {
    INACTIVE: 'inactive',
    ACTIVE: 'active',
    DEACTIVE: 'deactive',
    DELETED: 'deleted'
  };
export const GROUP_ALERT_TYPE = {
    CUSTOMER: 'customer',
    GLOBAL: 'global'
};
export enum USER_ROLE {
    ADMIN = "admin",
    MANAGER="manager",
    LEADER="leader",
    MEMBER="member"
}
export enum LEVEL_KEYWORD {
    level_1=1000,
    level_2=2000,
    level_3=3000
}
export interface IResultdoc{
    message:string
    status:number
    data?:IKeyword
}

export interface IKeyword{
    _id:String,
    keyword:String,
    level:String,
    projectId:String,
    priority:String,
    createBy:String,
    createAt:Date,
    updateBy:String,
    updateAt:Date,
    timeStart:Date,
    timeEnd:Date
}
export interface IProject{
    _id:String,
    name:String,
    createBy:String,
    createAt:Date,
    updateBy:String,
    updateAt:Date,
    timeStart:Date,
    timeEnd:Date,
}
export interface IResultKeyword {
    status:number,
    message:string,
    data?:[IKeyword]
}
export interface IResultProject {
    status:number,
    message:string,
    data?:[IProject]
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
