import mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    isActive:Boolean,
    firstName:String,
    lastName:String,
    permission:String,
    status:String,
    accessToken:String,
    refreshToken:String,
    createBy:String,
    createAt:Date,
    updateBy:String,
    updateAt:Date
},{
})


export const user =  mongoose.model('User',userSchema)