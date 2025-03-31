import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv';
import userRoute from "./routes/user.routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import transactionRouter from "./routes/transaction.routes.js";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`MongoDb connected Successfully`)

})
.catch((err)=>{
    console.log('MongoDb connection Failed',err);
})
app.listen(3000,()=>{
    console.log(`Server is listening on Port 3000`);
})

app.use('/',userRoute);
app.use('/',transactionRouter)

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client' ,'dist', 'index.html'));
})