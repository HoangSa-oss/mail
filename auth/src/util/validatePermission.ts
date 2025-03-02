export const validatePermission = async (user:any,user_role:any)=>{
    if(!user){
        return false
    }
    const permission:any = user|| ''
    if(!permission) return false
    if(permission!=user_role){
        return false
    }
    return true
}