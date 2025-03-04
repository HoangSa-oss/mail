
import {rule} from 'graphql-shield'
import { USER_ROLE } from '../config/constant'
import {validatePermission}  from '../util/validatePermission'
const isAuthentication = rule()(async(parent,args,ctx)=>{
    const {token} = ctx
    if(!token){
        return new Error('Token Error')
    }
    return true
})
const isAdmin = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.ADMIN))
const isManager = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.MANAGER))
const isLeader = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.LEADER))
const isMember = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.MEMBER))

export {
    isAuthentication,
    isAdmin,
    isMember,
    isLeader,
    isManager
}