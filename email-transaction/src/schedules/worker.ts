import config from '../config'
import {connect as connectMongoDB} from '../external-libs/mongoose'
import {createRabbitChannel} from '../external-libs/rabittmq'
import EmailModel from '../datasource/email';
import RecipientModel from '../datasource/recipient';
import mandrill from 'mandrill-api';
import { TYPE_TO_SEND } from '../config/constant';
import cryptoRandomString from 'crypto-random-string';
import isEmpty from 'lodash'
const MandrillClient = new mandrill.Mandrill(config.apiKeyMandrill);

function replaceBase64Images(html, getCid) {
  return html.replace(/(<img[\s\S]*? src=")data:(image\/(?:png|jpe?g|gif));base64,([\s\S]*?)("[\s\S]*?>)/g, function(
    g,
    start,
    mimeType,
    base64,
    end
  ) {
    return start + 'cid:' + getCid(mimeType, base64) + end;
  });
}
const job = async() => {
  await connectMongoDB()
  const Channel = await createRabbitChannel({})
  await Channel.assertQueue(config.amqpQueueEmail, { durable: true });
  Channel.cosume(config.amqpQueueEmail,
    async(msg:any)=>{
      try {
        await sentMail(msg);
        Channel.ack(msg);
      } catch (error) {
        // logger.error(`Sent Email Error: ${error}`, 'Logic');
      }},
      { noAck: false }
    )
}
const sentMail = async(msg:any)=>{
  const body = msg.content.toString();
  const data = JSON.parse(body);
  const listEmails = data.emails.map(email => email.email);
  const emailErrorMessage = `[Email Worker] - Cannot send Email to ${listEmails.join(',')}`;
  let isSent = false;
  let domain = data.domain.toLowerCase()
  // '<SUBJECT><div style="text-align:center"><a href="' +
  // linkPreview +
  const content = '">Read this e-mail on the Web</a></div></SUBJECT>' +data.newContent;
    const from_email = config.infoByDomain[domain].fromEmailAlert 
    const from_name = config.infoByDomain[domain].fromName 
    let messageSend = {
      subject: data.subject,
      from_email: data.fromEmail || from_email,
      from_name: data.fromName || from_name,
      html: data.newContent,
      to: data.emails,
      preserve_recipients: true,
      track_clicks: false,
      url_strip_qs: false
    } as any;

    const objBase64Attachs = {};
    let listImageAttachments = [] as any;

    if (data.type === TYPE_TO_SEND.REPORT) {
        messageSend.from_email = config.infoByDomain[domain].fromEmailReport || config.infoByDomain['default'].fromEmailReport;
      // include images
      const htmlTemp = replaceBase64Images(content, function(mimeType, base64) {
        if (objBase64Attachs[base64]) return objBase64Attachs[base64].cid;
        const randomCid = cryptoRandomString({ length: 8 });
        objBase64Attachs[base64] = {
          type: mimeType,
          name: randomCid,
          content: base64
        };
        return randomCid;
      });

      if (!isEmpty(objBase64Attachs)) {
        listImageAttachments = Object.keys(objBase64Attachs).map(key => objBase64Attachs[key]);
        messageSend.html = htmlTemp;
        messageSend.images = listImageAttachments;
      } else {
        messageSend.html = content;
      }
    }
    MandrillClient.messages.send(
      {
        message: messageSend,
        async: true
      },
      async sentEmails => {
        sentEmails.forEach(sentEmail => {
          if (sentEmail.status === 'queued') {
            isSent = true;
          }
          if (sentEmail.status !== 'queued' && sentEmail.status !== 'sent') {
            // postMessageToChannel({ webhookURL: config.slackCMSHealthcheckWebHookURL, message: emailErrorMessage });
            // logger.info(
            //   `Mandrill Response (${sentEmail.email} | Email ID: ${sentEmail.emailId})`,
            //   `Reject Reason: ${sentEmail.reject_reason} | Status: ${sentEmail.status}`
            // );
          }
          // RecipientModel.updateByQuery(
          //   {
          //     emailId: data.emailId,
          //     email: sentEmail.email
          //   },
          //   {
          //     status: sentEmail.status, // status pushed to queue
          //     reject_reason: sentEmail.reject_reason
          //   }
          // );
        });
        if (isSent) {
          // await EmailModel.updateByQuery({ _id: data.emailId }, { status: QUEUE_STATUS.SENT, linkPreview });
        }
      }
    );
}
job()