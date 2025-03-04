import { shield,and,or } from "graphql-shield";
import { ApolloError } from "apollo-server-express";
import {
    isAuthentication,
    isAdmin,
    isMember,
    isLeader,
    isManager
} from './rule'

export default shield ({
    Query:{
        emailGroupById:isAuthentication, 
        emailGroupByIds:isAuthentication
    },
  

})