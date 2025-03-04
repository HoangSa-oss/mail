import mongoose, { Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { generateModel } from '../mongo/generateModel'
const schema = 
    {
        name: {
          type: String,
          trim: true,
          unique: true,
          required: [true, "Name required"],
          minlength: [4, "Minimun name length 4 characters"]
        },
        emails: [
          {
            type: String,
            required: true,
            validate: [isEmail, "Invalid email"]
          }
        ],
        groupType: String,
        status: {
          type: String,
          default: "active"
        },
        createdBy: String,
        createdAt: {
          type: Date,
          default: Date.now
        },
        updatedBy: String,
        updatedAt: Date
      }

export default generateModel({
    modelName: "EmailGroup",
    schema,
    collectionName: "email_groups"
})

