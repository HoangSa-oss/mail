import app from "./app"
import 'dotenv/config'
import {createAccessToken} from './util/token'
const start = async() =>{
        const token = await createAccessToken()
        console.log(token)
        app.listen(5000,()=>{
   
        })
 
    
}
start()