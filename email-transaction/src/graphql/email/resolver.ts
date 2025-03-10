/* eslint-disable no-mixed-operators */
import config from '../../config'
import { IResolvers } from "@graphql-tools/utils";
import { Redis } from "ioredis";
import { QUEUE_STATUS, TYPE_TO_SEND } from '../../config/constant';


export const resolvers:IResolvers = {
    Query:{
    },
    Mutation:{
      async sendEmailMessage(parent, args,ctx) {
        const result = {
          status: 200,
          message: 'Created success',
          data: null
        };
        const {dataSource,Channel,user,logger} = ctx
        const {Email,Recipient} = dataSource()
        const { subject, html, emails, type, domain } = args;
        const newContent = html;
        try {
          let fromEmail = config.infoByDomain[domain].fromEmailReport
          let fromName = config.infoByDomain[domain].fromName
          if (type === TYPE_TO_SEND.ALERT) {
            fromEmail = config.infoByDomain[domain].fromEmailAlert || config.infoByDomain['default'].fromEmailAlert;
            fromName = config.infoByDomain[domain].fromName || config.infoByDomain['default'].fromName;
          }
          const createdEmail = await Email.create({
            ...args,
            createdBy: "AI",
            fromEmail,
            fromName
          });
          const createdRecipients = await Recipient.createListRecipientFromEmail(createdEmail._id, emails);
          const emailId = createdEmail._id.toString();
          await Channel.assertQueue(config.amqpQueueEmail, { durable: true });
          await Channel.sendToQueue(
            config.amqpQueueEmail,
            Buffer.from(
              JSON.stringify({
                domain,
                emailId,
                newContent,
                type,
                subject,
                emails
              })
          ))
          let recipientIds = createdRecipients.map((item:any)=>item._id)
          const updateEmail = await Email.update({
            _id:emailId,
            status: QUEUE_STATUS.PUSHED,
            recipientIds
          })
          result.data = updateEmail
          return result
        } catch (error) {
          console.log(error)
        }
      }
    }
   
   
}