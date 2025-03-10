import { MongoDataSource } from 'apollo-datasource-mongodb'

export class ModelDataSource extends MongoDataSource<any>{
    constructor(options:any){
        super(options)
    }
    async create(input:any){
        const { to, ...info } = input;
        const newDoc = await this.model?.create({
          ...info
        });
        return newDoc
    }
    async update(input:any){
        const { _id, ...data } = input;
        const existDoc = await this.model?.exists({_id})
        if (!existDoc) throw Error("Document not exist with id: " + _id);
        const updateDoc = await this.collection.updateOne(
        {_id},
        {...data,updatedAt: new Date()}
    );
        return updateDoc
    }
  
}

