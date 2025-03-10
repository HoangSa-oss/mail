import { MongoDataSource } from 'apollo-datasource-mongodb'

export class ModelDataSource extends MongoDataSource<any>{
    constructor(options:any){
        super(options)
    }
    async createListRecipientFromEmail(_id:string,emails:[]=[]){
        if(!_id||emails.length ==0){
            throw new Error("Cannot create recipient from email null");
        }
        const recipient = emails.map((item:any)=>({
            emailId:_id,
            ...item
        }))
        const newDocs = await this.collection.insertMany(recipient)
        return newDocs

    }
  
}

