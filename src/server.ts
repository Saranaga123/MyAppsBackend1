import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; 
import jwt from 'jsonwebtoken';
import { sample_houserent } from "./data"; 
import {dbConnect} from "./configs/database.config" ;
import asyncHandler from 'express-async-handler';
import { Houserent, HouserentModel } from "./models/houserent.model";
import bodyParser from "body-parser"; 
dbConnect();  
const app = express(); 
app.use(bodyParser.json({
    limit: '50mb'
  })); 
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
  }));
app.use (cors({
    credentials:true,
    origin:[ "http://localhost:4200"]
}));

app.get("/api/houserent",asyncHandler(
    async(req,res)=>{
        res.header('Access-Control-Allow-Origin', '*'); 
        const users = await HouserentModel.find(); 
        res.send(users)
    }
))
app.post("/api/houserent/Create",asyncHandler(
    async(req,res,next)=>{
        await HouserentModel.deleteMany(); 
        res.header('Access-Control-Allow-Origin', '*'); 
        const {id,name,accountNumber,bank}=req.body; 
        const newHouserent:Houserent = {  
            id:'',
            name:name, 
            bank:bank, 
            accountNumber:accountNumber, 
        }  
        const dbUser = await HouserentModel.create(newHouserent);
        res.send("Done")
    }
)) 
app.get("/api/houserent/destro",asyncHandler(
    async(req,res)=>{
        const houserents = await HouserentModel.deleteMany(); 
        res.send(houserents)
    }
)) 
app.get("/api/houserent/seed",asyncHandler(
    async (req,res)=>{
        const houserents =await HouserentModel.countDocuments();
        if(houserents>0){
            res.send ("seed is already done");
            return;
        }
        await HouserentModel.create(sample_houserent)
        res.send("user seed is done");
    }
))    
 
const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" + port);
}) 
app.get("/api/houserent/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await HouserentModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
)) 
app.get("/api/destro",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await HouserentModel.deleteMany();  
        res.send(" All Data Erased ! ")
    }
)) 
app.get("/api/seed",asyncHandler(
    async (req,res)=>{  
        const userCount =await HouserentModel.countDocuments();
        if(userCount>0){
            await HouserentModel.deleteMany(); 
            await HouserentModel.create(sample_houserent)
        }else{
            await HouserentModel.create(sample_houserent)
        }  
        res.send("Data Seeding Done ! ") 
    }
))
 