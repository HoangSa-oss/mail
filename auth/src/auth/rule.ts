
import {rule} from 'graphql-shield'
import { USER_ROLE } from '../config/constant'
import {validatePermission}  from '../util/validatePermission'
const isAuthentication = rule()(async(parent,args,ctx)=>{
    const {user} = ctx
    if(!user){
        return new Error('dang nhap di')
    }
    return true
})
const isAdmin = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.ADMIN))
const isManager = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.MANAGER))
const isLeader = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.LEADER))
const isEmployee = rule()(async(parent,args,ctx)=> validatePermission(ctx.user.permission,USER_ROLE.MEMBER))

export {
    isAuthentication,
    isAdmin,
    isEmployee,
    isLeader,
    isManager
}