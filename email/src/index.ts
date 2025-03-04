import app from "./app"
import { connect } from "./external-libs/mongoose"



const start = async() =>{
    app.listen(4001)
    console.log("locahost:4001")
    connect()
}
start()
