import { MongoDataSource } from 'apollo-datasource-mongodb'
import { IKeyword} from "../../config/constant"

export class ModelDataSource extends MongoDataSource<any>{
    public collection :any
    constructor(options:any){
        super(options)
        this.collection = options.collection
    }
    async create(input:IKeyword) {
        const newDoc = new this.collection(input)
        await newDoc.save()
        return newDoc
    }
    async update({_id,...info}:IKeyword,ttl:number){
        const udpateUser = await this.collection
            .updateOne({_id},{...info})
            .lean()
            .exec()
        if(!udpateUser){
            throw new Error('Cannot update')
        }
        return udpateUser
    }
    async delete({_id}:IKeyword){
        await this.collection.deleteOne({_id})
    }
    
}

