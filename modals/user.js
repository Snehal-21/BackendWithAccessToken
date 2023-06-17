import mongoose from "mongoose";
import { Schema } from "mongoose";

const user=new Schema({
    name:String,
    email:String,
    password:String,
    accesstoken:String
});

export default mongoose.model("User",user) 