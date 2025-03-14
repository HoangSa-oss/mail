import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    scalar Date
    type Query {
    
    }
    type Mutation {
        sendEmailMessage(input: SendEmailMessageInput!): ResultEmailMessagePayload
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
    type EmailMessage @key(fields: "_id") {
        _id: ID!
        domain: DomainType!
        projectId: ID
        type: TypeToSend
        topicIds: [ID]
        groupIds: [ID]
        urlAttachment: String
        status: QueueStatus
        html: String
        text: String
        subject: String
        fromEmail: String!
        fromName: String
        recipientIds: [ID]
        sentStatus: SendStatus
        sentMessage: String
        createdBy: String
        createdAt: Date
        updatedAt: Date
        linkPreview: String
    }
    extend type EmailMessage {
        recipients: [Recipient!]
        emailGroups: [EmailGroup]
    }

`
// extend type EmailMessage {
//     recipients: [Recipient!]
//     emailGroups: [EmailGroup]
//     sender: User
//     project: Project
//     topics: [Topic]
// }