import { GraphQLScalarType, Kind } from 'graphql';
import { gql } from 'apollo-server-express';
export const typeDefs = gql`
    enum USER_ROLE {
        admin,
        manager,
        leader,
        member,
    }
    scalar Date
    type Query {
        me:ResultUserPayload
    }
    type Mutation{
        createUser(input:CreateUserInput):ResultUserPayload
        login(input:LoginInput!):AuthenticationPayload
        logout:LogoutPayload
        changePassword(input:ChangePasswordInput!):ResultUserPayload
    }
    type LogoutPayload {
        status:Int
        message:String
    }
    type User @key(fields:"_id"){
        _id:String!
        username:String
        firstName:String
        lastName:String
        email:String
        isActive:Boolean
        permission:String
        createBy:String
        createAt:Date
        updateBy:String
        updateAt:String
    }
    type ResultUserPayload{
        status:Int
        message:String
        data:User
    }
    type AuthenticationPayload{
      status:Int
      message:String
      accessToken:String
      refreshToken:String
      data:User
    }
    input activeUserInput{
        _id:String!
        permission:USER_ROLE!
        isActive:Boolean!
    }
    input ForgotPasswordInput{
        email:String!
    }
    input UpdateForgotPasswordInput{
        userId:String!
        passCode:String!
        newPassword:String!
    }
    input ChangePasswordInput {
        oldPassword:String!
        newPassword:String!
    }
    input CreateUserInput {
        username:String!
        password:String!
        email:String!
        firstName:String!
        lastName:String!
        permission:USER_ROLE!
    }
    input LoginInput {
      username:String!
      password:String!
    }
`;


