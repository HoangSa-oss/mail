import { MongoDataSource } from 'apollo-datasource-mongodb'

export class ModelDataSource extends MongoDataSource<any>{
    constructor(options:any){
        super(options)
    }
  
}

