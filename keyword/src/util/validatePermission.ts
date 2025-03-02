import { GraphQLError } from 'graphql';

export const validatePermission = async (user:any,user_role:any)=>{
    if(!user){
        return  new GraphQLError('You are not authorized to perform this action.', {
            extensions: {
                code: 'FORBIDDEN',
                status:403
            
            },
          });
    }
    const permission:any = user|| ''
    if(!permission) return new GraphQLError('You are not authorized to perform this action.', {
        extensions: {
            code: 'FORBIDDEN',
            status:403
    
        },
      });
    if(permission!=user_role){
        return new GraphQLError('You are not authorized to perform this action.', {
            extensions: {
              code: 'FORBIDDEN',
              status:403
            },
          });
    }
    return true
}