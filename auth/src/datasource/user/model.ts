import { userSchema } from "./schema"
import mongoose from "mongoose"
import { MongoDataSource } from "../mongo/datasource"
import { IUser } from "../../config/constant"

export class ModelDataSource extends MongoDataSource{
    async create(input:IUser,ttl:number) {
        const newDoc = new this.collection(input)
        await newDoc.save()
        return newDoc
    }
    async update({_id,...info}:IUser,ttl:number){
        const udpateUser = await this.collection
            .updateOne({_id},{...info})
            .lean()
            .exec()
        if(!udpateUser){
            throw new Error('Cannot update')
        }
        return udpateUser
    }
    async delete({_id}:IUser){
        await this.collection.delete({_id})
    }
    
}

