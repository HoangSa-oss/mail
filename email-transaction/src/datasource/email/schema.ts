import mongoose, { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { generateModel } from '../mongo/generateModel'
import { QUEUE_STATUS } from '../../config/constant'

const schema = {
  domain: { type: String, required: true },
  projectId: String,
  status: {
    type: String,
    default: "created",
    enum: Object.values(QUEUE_STATUS)
  },
  type: String,
  topicIds: [String],
  groupIds: [String],
  urlAttachment: String,
  html: String,
  text: String,
  subject: {
    type: String,
    trim: true,
    required: true
  },
  fromEmail: {
    type: String,
    trim: true,
    required: true,
    validate: [isEmail, "Invalid email"]
  },
  fromName: String,
  recipientIds: [
    {
      type: String,
      required: true
    }
  ],
  linkPreview: String,
  sentStatus: String,
  sentMessage: String,
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
};

export default generateModel({
  schema,
  modelName: "Email",
  collectionName: "emails"
});
