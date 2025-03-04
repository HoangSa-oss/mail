import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar Date
    type Query {
        emailGroupById(_id:ID!):ResultEmailGroup
        emailGroupByIds(_id:[ID!]!):ResultEmailGroupList
    }
    type EmailGroup @key(fields: "_id") {
        _id: ID!
        name: String!
        emails: [String!]!
        groupType: GroupAlertType
        status: SharedStatus
        createdBy: String
        createdAt: Date
        updatedBy: String
        updatedAt: Date
    }
    type ResultEmailGroup {
        status:Int,
        message:String,
        data:EmailGroup
    }
    type ResultEmailGroupList {
        status:Int,
        message:String,
        data:[EmailGroup]
    }
`