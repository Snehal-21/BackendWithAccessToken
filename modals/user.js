import mongoose from "mongoose";
import { Schema } from "mongoose";

const user=new Schema({
    name:String,
    email:String,
    password:String,
    accesstoken:String
    // accesstoken: {
    //     type : String,
    //     unique : true,
    //     required : true
    // }
});

export default mongoose.model("User",user) 