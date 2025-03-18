const express =  require ("express")
const axios = require("axios")
const cors = require("cors")


const app  = express()
app.use(cors({
    origin:"http://locaolhost:3000"
})

)
