import { ApolloError } from "apollo-server-express";
import { shield,and,or } from "graphql-shield";
import {
    isAuthentication,
    isAdmin,
    isEmployee,
    isLeader,
    isManager
} from './rule'
export default shield({
    Query: {
        me:isAuthentication
    },
    Mutation:{
        // createUser:and(isAuthentication, or(isAdmin)),
        logout:isAuthentication,
        changePassword:isAuthentication,
    }
    },
    {
        fallbackError: (thrownThing, parent, args, context, info) => {
          if (thrownThing instanceof ApolloError) {
            return thrownThing;
          } else if (thrownThing instanceof Error) {
            return new ApolloError(thrownThing.message, 'ERR_INTERNAL_SERVER');
          }
          console.log('thrownThing------', thrownThing);
          return new ApolloError('Permission Error', 'ERR_INTERNAL_SERVER');
        },
        debug: false
    }
)