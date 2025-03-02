import { DataSource } from "apollo-datasource"

export class MongoDataSource extends DataSource{
    public collection:any
    constructor(collection:any){
        super()
        this.collection = collection
    }

}