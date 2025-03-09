import { gql } from 'apollo-server-express';

export const typeDefs =  gql`
  extend type Query {
    emailTemplateById(_id: ID!): ResultEmailTemplatePayload
    emailTemplateByIds(ids: [ID!]): ResultListEmailTemplatePayload
  }
  type EmailTemplate {
    _id: ID!
    name: String!
    html: String!
    subject: String
    haveProfile: Boolean
    status: SharedStatus
    displayCC: Boolean
    displayBCC: Boolean
    createdBy: String
    createdAt: Date
    updatedBy: String
    updatedAt: Date
  }

  type ResultEmailTemplatePayload {
    status: Int
    message: String
    data: EmailTemplate
  }

  type ResultListEmailTemplatePayload {
    status: Int
    message: String
    data: [EmailTemplate]
  }
`;
