import app from "./app"
import { connect } from "./external-libs/mongoose"
import 'dotenv/config'


const start = async() =>{
    app.listen(4000)
    console.log("localhost:4000")
    connect()
}
start()
