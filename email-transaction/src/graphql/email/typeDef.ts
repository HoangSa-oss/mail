import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar Date
    type Query {
        emailGroupById(_id:ID!):ResultEmailGroup
        emailGroupByIds(_id:[ID!]!):ResultEmailGroupList
    }
    type Mutation {
        sendEmail(input: SendEmailMessageInput!): ResultEmailMessagePayload
    }
    input SendEmailMessageInput {
        domain: DomainType
        projectId: ID
        topicIds: [ID!]
        html: String
        subject: String
        emails: [EmailToInput!]
        type: TypeToSend
        groupIds: [ID]
        urlAttachment: String
    }
    input EmailToInput {
        email: String!
        type: EmailToType!
    }
    type ResultEmailMessagePayload {
        status: Int
        message: String
        data: EmailMessage
    }
    type EmailMessage {
        recipients: [Recipient!]
        emailGroups: [EmailGroup]
        sender: User
        project: Project
        topics: [Topic]
  }

`