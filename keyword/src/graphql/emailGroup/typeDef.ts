import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar Date
    enum level {
       level_1
       level_2
       level_3
    }
    type Query {
        emailGroupById(input:InputQueryKeyword):ResultQueryKeyword
    }
    type Mutation {
       
    }
    type Keyword {
        _id:String,
        key:String
        level:level
        projectId:String,
        priority:String,
        createBy:String,
        createAt:Date,
        updateBy:String,
        updateAt:Date,
        timeStart:Date,
        timeEnd:Date,
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
        data:[Keyword]
    }
  
    type ResultUpdateKeyword {
        status:Int,
        message:String,
        data:[Keyword]
    }
    type ResultDeleteKeyword {
        _id:String
    }
    input InputQueryKeyword {
        skip:Int,
        limit:Int,
        sort:String,
        asc:Int
    }
    input InputAddKeyword {
        key:String,
        projectId:String,
        priority:level,
        timeStart:Date,
        timeEnd:Date
    }
    input InputUpdateKeyword {
        _id:String,
        key:String,
        projectId:String,
        priority:level,
        timeStart:Date,
        timeEnd:Date
    }
    input InputDeleteKeyword {
       _id:String
    }
`