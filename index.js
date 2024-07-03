const express = require("C:/Users/a1/AppData/Roaming/npm/node_modules/express")
const cors = require("C:/Users/a1/AppData/Roaming/npm/node_modules/cors")
const bodyParser = require("C:/Users/a1/AppData/Roaming/npm/node_modules/body-parser")
const app = express()
const apiRoute = require('./routes/def_route')
const connectDB = require('./db/connect')

require('C:/Users/a1/AppData/Roaming/npm/node_modules/dotenv').config()
const path = require('path');

// global variables
const PORT = process.env.PORT

// app use contan
// routes midder way
app.use(cors({
    origin:"*"
}))
app.use(bodyParser.json())
app.use('/',apiRoute);
app.use(express.static("./static/"))

runPoint=async()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`Server currently run on http://localhost:3000`);
        })

        // database connection
        // const conDB = await connectDB(process.env.DB_URI)
        // console.log(conDB);
        // console.log("Connection done");

    } catch (error) {
        console.log(error);
    }finally{
        
    }
}

runPoint()