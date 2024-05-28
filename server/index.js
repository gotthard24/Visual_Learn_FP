import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`Run on ${process.env.PORT || 3001}`);
})