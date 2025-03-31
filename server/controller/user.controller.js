import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

export const Register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(200).json({Success:false,message:"User already exist"});
             
        }
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        })

        await newUser.save();
        res.status(200).json({success:true,message:"User registered Successfully"});
    } catch (error) {
        console.log(error);
        res.status(404).json({success:false,error});
    }
}
export const Login = async(req,res)=>{
    try{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({Success:false,message:"User Not exist"});
    }

    const comparePassword = await bcrypt.compare(req.body.password,user.password);

    if(!comparePassword){
        return res.status(403).json({Success:false,message:"Invalid Credential"})
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        path: '/', 
    });
    
  
    res.status(200).json({Success:true,user,token})
    
}
    catch(err){
        console.log(err);
        res.status(403).json({Success:false,message:"Internal Server Error"})
    }
}