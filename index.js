import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import router from "./routes/userroutes.js";

const app=express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api/v3',router);

mongoose.connect('mongodb+srv://Snehal:Snehal1234@mern-todo.va7rcii.mongodb.net/AccessKeyDB?retryWrites=true&w=majority')
.then(()=>console.log("DB coneected"))
.catch((err)=>console.log(err,"db error"));

app.listen(6000,()=>console.log("working on PORT 6000"));