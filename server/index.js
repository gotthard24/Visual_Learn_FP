import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import usersRouter from './routers/users.r.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT || 3001, () => {
  console.log(`Run on ${process.env.PORT || 3001}`);
});

app.get("/api", (req, res) => {
  res.json({
    message: `Hello ${process.env.MY_NAME} from server!`,
  });
});

app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, '../../client/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist', "index.html"));
});
