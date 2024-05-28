import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import users_router from './routers/users.r.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`Run on ${process.env.PORT || 3001}`);
})

app.get("/api", (req, res) => {
    res.json({
      message: `Hello ${process.env.MY_NAME} from server!`,
    });
});

app.use('/users', users_router)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});