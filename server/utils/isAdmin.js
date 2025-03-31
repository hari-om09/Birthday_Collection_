import jwt from 'jsonwebtoken'
import User from '../model/user.model.js';

export const isAdmin = async(req,res,next)=>{

    try{
    const token = req.cookies.token

    if(!token){
        return res.status(403).json({Success:false,message:"Unauthorized Access"});
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
  
    const user = await User.findById(decodedToken.id);
    
    if(user.role != 'admin'){
        return res.status(403).json({Success:false,message:"Unauthorized:User not Found",user});
    } 
  return res.status(200).json({Success:true});
    next();
}
    catch(err){
        console.log(err);
        res.status(403).json({Success:false,message:"Internal Server Error"});
    }

 }
 export const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
  
        if (!token) {
            
            return res.status(401).json({ message: 'Unauthorized: Please Login ' });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        console.log('Decoded token:', decoded);
  
        const user = await userModel.findById(decoded.userId);
        console.log('User:', user);
  
        if (!user) {
            return res.status(403).json({ message: 'Unauthorized: User not found' });
        }
  
  
        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };