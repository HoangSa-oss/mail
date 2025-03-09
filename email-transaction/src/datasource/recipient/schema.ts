import mongoose, { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { generateModel } from '../mongo/generateModel'
import { QUEUE_STATUS,EMAIL_TO_TYPE } from '../../config/constant'

const schema = {
  email: {
    type: String,
    trim: true,
    required: true,
    validate: [isEmail, "Invalid email"]
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(EMAIL_TO_TYPE)
  },
  status: { type: String, enum: Object.values(QUEUE_STATUS) },
  reject_reason: String,
  id_response: String,
  emailId: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
};

export default generateModel({
  schema,
  modelName: "Recipient",
  collectionName: "recipients"
});
