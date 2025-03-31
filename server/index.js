import mongoose from "mongoose";
import express from 'express'
import dotenv from 'dotenv';
import userRoute from "./routes/user.routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import transactionRouter from "./routes/transaction.routes.js";
dotenv.config();

const app = express();
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