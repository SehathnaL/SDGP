const express =  require ("express")
const axios = require("axios")
const cors = require("cors")


const app  = express()
app.use(cors({
    origin:"http://locaolhost:3000"
})
 
)
app.post("/synthesize", async (req,res)=>{
    const text = req.body.text
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    

    })
