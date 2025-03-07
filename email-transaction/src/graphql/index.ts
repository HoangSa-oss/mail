import { buildSubgraphSchema } from '@apollo/federation';
import { applyMiddleware } from 'graphql-middleware';
import permission from '../rule/acl'
import { gql } from 'apollo-server-express';
import { SHARED_STATUS,DOMAIN_TYPE,GROUP_ALERT_TYPE } from '../config/constant'
import emailGroup from './email'
import emailTemplate from './emailTemplate'

const initTypeDefs = gql`
  enum DomainType {
    ${Object.keys(DOMAIN_TYPE).join('\n')}
  }
  enum SharedStatus {
    ${Object.keys(SHARED_STATUS).join('\n')}
  }
enum GroupAlertType {
    ${Object.keys(GROUP_ALERT_TYPE).join('\n')}
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
        emailTemplate
]as any)

export default applyMiddleware(schema,permission)

