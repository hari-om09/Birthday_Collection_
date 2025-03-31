import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    role:{
        type:String,
        default:"member"
    }

})

const User = mongoose.model('User',userSchema);
export default User;