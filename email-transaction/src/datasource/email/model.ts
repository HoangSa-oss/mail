import { MongoDataSource } from 'apollo-datasource-mongodb'
import { IKeyword} from "../../config/constant"

export class ModelDataSource extends MongoDataSource<any>{
    constructor(options:any){
        super(options)
    }
    async create() {
        // const newDoc =  await this.model?.create({name:'123sc3'})
        // return newDoc
    }
   
    async update({_id,...info}:IKeyword,ttl:number){
        const udpateUser = await this.model?.updateOne({_id},{...info})
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

