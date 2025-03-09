import { buildSubgraphSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';
import permission from '../rule/acl'
import { gql } from 'apollo-server-express';
import { SHARED_STATUS,DOMAIN_TYPE, SORT_TYPE, EMAIL_TO_TYPE, QUEUE_STATUS, SEND_STATUS, TYPE_TO_SEND } from '../config/constant'
import emailGroup from './email'

const initTypeDefs = gql`
  scalar Date
  scalar DateTime
  scalar JSON
  enum SortType {
    ${Object.keys(SORT_TYPE).join('\n')}
  }
  enum QueueStatus {
    ${Object.keys(QUEUE_STATUS).join('\n')}
  }
  enum SendStatus {
    ${Object.keys(SEND_STATUS).join('\n')}
  }
  enum DomainType {
    ${Object.keys(DOMAIN_TYPE).join('\n')}
  }
  enum TypeToSend {
    ${Object.keys(TYPE_TO_SEND).join('\n')}
  }
  enum EmailToType {
    ${Object.keys(EMAIL_TO_TYPE).join('\n')}
  }
`;

const initResolvers = {
  // SharedStatus: {
  //   ...SHARED_STATUS
  // },
  // GroupAlertType: {
  //   ...GROUP_ALERT_TYPE
  // },
  // DomainType: {
  //   ...DOMAIN_TYPE
  // },
 
};
const schema = buildSubgraphSchema([
        {
          resolvers:initResolvers,
          typeDefs:initTypeDefs 
        },
        emailGroup,
        
]as any)

export default applyMiddleware(schema,permission)

