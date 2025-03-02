
import mongoose, { Schema } from "mongoose"
require('dotenv').config()
const collectionPrefix = process.env.MONGO_COLLECTION_PREFIX
export const generateModel = async({modelName,schema,collectionName}:{modelName:string,schema:any,collectionName:string})=>{
    return mongoose.model(
        modelName,
        new Schema(schema,{
            collection: `${collectionPrefix}_${collectionName}`,
            versionKey: false,
            strict: false
        })

    )
}