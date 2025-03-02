import mongoose from "mongoose";


export const connect = async ()=>{
    
    let mongoUrl = `mongodb://localhost:27017/authentication`
    await mongoose.connect(mongoUrl)
    return mongoose
}