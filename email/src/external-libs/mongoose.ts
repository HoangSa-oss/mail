import mongoose from "mongoose";


export const connect = async ()=>{
    let mongoUrl = `mongodb://localhost:27017/kompa-cms-db`
    await mongoose.connect(mongoUrl)
    return mongoose
}