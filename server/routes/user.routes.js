import express from 'express'
import { Login, Register } from '../controller/user.controller.js';
import { isAdmin } from '../utils/isAdmin.js';



const userRoute = express.Router();

userRoute.post('/user/signup',Register);
userRoute.post('/user/login',Login)
userRoute.get('/user/isadmin',isAdmin);
export default userRoute;