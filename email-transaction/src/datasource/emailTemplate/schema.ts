import { generateModel } from '../mongo/generateModel'

const schema = {
  name: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Name required'],
    minlength: [4, 'Minimun name length 4 characters']
  },
  html: {
    type: String,
    required: true
  },
  subject: String,
  haveProfile: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'active'
  },
  displayCC: {
    type: Boolean,
    default: true
  },
  displayBCC: {
    type: Boolean,
    default: true
  },
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedBy: String,
  updatedAt: Date
};

export default generateModel({
  schema,
  modelName: 'EmailTemplate',
  collectionName: 'email_templates'
});
