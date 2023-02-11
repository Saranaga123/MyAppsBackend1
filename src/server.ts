import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; 
import jwt from 'jsonwebtoken';
import { sample_prods, sample_users } from "./data";
import { sample_admin_note, sample_buyer_requests } from "./simpledata"
import {dbConnect} from "./configs/database.config" ;
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "./models/user.model";
import bodyParser from "body-parser";
import { Product, ProductModel } from "./models/product.model";
import { BuyerRequest, BuyerRequestModel } from "./models/buyerRequest.model"
import { AdminNote, AdminNoteModel } from "./models/adminNote.model";
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

app.get("/api/users",asyncHandler(
    async(req,res)=>{
        const users = await UserModel.find(); 
        res.send(users)
    }
))
app.post("/api/users/Create",asyncHandler(
    async(req,res,next)=>{
        const {add1,add2,add3,district,email,id,name,nic,password,photo,role,tp,type,}=req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.send("already there")
            return
        }
        const newUser:User = { 
            add1:req.body.add1,
            add2:add2,
            add3:add3,
            district:district,
            email:email,
            id:'',
            name:name,  
            nic:nic,
            password:password,
            photo:photo,
            role:role,
            tp:tp,
            type:type 
        }  
        const dbUser = await UserModel.create(newUser);
        res.send("Done")
    }
))
 
app.get("/api/users/destro",asyncHandler(
    async(req,res)=>{
        const users = await UserModel.deleteMany(); 
        res.send(users)
    }
)) 
app.get("/api/users/seed",asyncHandler(
    async (req,res)=>{
        const userCount =await UserModel.countDocuments();
        if(userCount>0){
            res.send ("seed is already done");
            return;
        }
        await UserModel.create(sample_users)
        res.send("user seed is done");
    }
))
app.get("/api/products",asyncHandler(
    async(req,res)=>{
        const products = await ProductModel.find(); 
        res.send(products)
    } 
))
app.get("/api/products/destro",asyncHandler(
    async(req,res)=>{
        const products = await ProductModel.deleteMany(); 
        res.send(products)
    }
)) 
app.get("/api/products/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await ProductModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
))
app.get("/api/products/seed",asyncHandler(
    async (req,res)=>{
        const prodCount =await ProductModel.countDocuments();
        if(prodCount>0){
            res.send ("seed is already done");
            return;
        }
        await ProductModel.create(sample_prods)
        res.send("product seed is done");
    }
))
app.post("/api/products/Create",asyncHandler(
    async(req,res,next)=>{
        const {name,status,photo,price,email,fname,fcontact}=req.body; 
        const newProduct:Product = {
            name: name,
            photo: photo,
            status: status,
            price:price,
            email:email,
            fname:fname,
            fcontact:fcontact,
            id: ""
        }
        const dbUser = await ProductModel.create(newProduct);
        res.send("Done")
    }
))
app.get("/api/products/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        const product =await ProductModel.find();
        const products = product
        .filter(products => products.email.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(products)
    }
)
)

app.post("/api/products/Create",asyncHandler(
    async(req,res,next)=>{
        const {name,status,photo,price,email,fname,fcontact}=req.body; 
        const newProduct:Product = {
            name: name,
            photo: photo,
            status: status,
            price:price,
            email:email,
            fname:fname,
            fcontact:fcontact,
            id: ""
        }
        const dbUser = await ProductModel.create(newProduct);
        res.send("Done")
    }
))
app.get("/api/users/search/:searchTerm",asyncHandler(
        async(req,res)=>{
            const searchTerm = req.params.searchTerm;
            const user =await UserModel.find();
            const users = user
            .filter(users => users.email.toLowerCase()
            .includes(searchTerm.toLowerCase()));
        
            res.send(users)
        }
    )
)

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Website served on http://localhost:" + port);
})

app.get("/api/buyerrequest/seed",asyncHandler(
    async (req,res)=>{
        const buyerRequestCount =await BuyerRequestModel.countDocuments();
        if(buyerRequestCount>0){
            res.send ("seed is already done");
            return;
        }
        await BuyerRequestModel.create(sample_buyer_requests)
        res.send("Buyer Request seed is done");
    }
))
app.get("/api/buyerrequest",asyncHandler(
    async(req,res)=>{
        const buyerRequestCount = await BuyerRequestModel.find(); 
        res.send(buyerRequestCount)
    } 
))
app.get("/api/buyerrequest/destro",asyncHandler(
    async(req,res)=>{
        const buyerRequestCount = await BuyerRequestModel.deleteMany(); 
        res.send(buyerRequestCount)
    }
)) 
app.get("/api/buyerrequest/search/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        const buyerrequest =await BuyerRequestModel.find();
        const buyerrequests = buyerrequest
        .filter(buyerrequests => buyerrequests.femail.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(buyerrequests)
    }
)
)
app.get("/api/buyerrequest/buyerbasesearch/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        const buyerrequest =await BuyerRequestModel.find();
        const buyerrequests = buyerrequest
        .filter(buyerrequests => buyerrequests.bemail.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(buyerrequests)
    }
)
)
app.get("/api/buyerrequest/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await BuyerRequestModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
))
app.post("/api/buyerrequest/Create",asyncHandler(
    async(req,res,next)=>{
        const {bname,bcontact,femail,price,product,bemail,fname,fcontact}=req.body; 
        const newBuyerRequest:BuyerRequest = {
            bname: bname,
            bemail:bemail,
            bcontact: bcontact,
            price: price,
            femail:femail,
            product:product,
            fname:fname,
            fcontact:fcontact,
            id: ""
        }
        const dbBuyerRequest = await BuyerRequestModel.create(newBuyerRequest);
        res.send("Done")
    }
))

app.get("/api/users/farmers",asyncHandler(
    async(req,res)=>{
        const searchTerm = "farmer";
        const user =await UserModel.find();
        const users = user
        .filter(users => users.role
        .includes(searchTerm));
    
        res.send(users)
    }
)
)
app.get("/api/users/buyers",asyncHandler(
    async(req,res)=>{
        const searchTerm = "buyer";
        const user =await UserModel.find();
        const users = user
        .filter(users => users.role
        .includes(searchTerm));
    
        res.send(users)
    }
)
)
app.get("/api/note/seed",asyncHandler(
    async (req,res)=>{
        const AdminNoteCount =await AdminNoteModel.countDocuments();
        if(AdminNoteCount>0){
            res.send ("seed is already done");
            return;
        }
        await AdminNoteModel.create(sample_admin_note)
        res.send("AdminNote seed is done");
    }
))
app.get("/api/note",asyncHandler(
    async(req,res)=>{
        const note = await AdminNoteModel.find(); 
        res.send(note)
    }
))
app.get("/api/note/destro",asyncHandler(
    async(req,res)=>{
        const dbDestroAdminNote = await AdminNoteModel.deleteMany(); 
        res.send(dbDestroAdminNote)
    }
)) 
app.post("/api/note/Create",asyncHandler(
    async(req,res,next)=>{
        const {note}=req.body; 
        const newAdminNote:AdminNote = {
            note: note,
            id: ""
        }
        const dbNewAdminNote = await AdminNoteModel.create(newAdminNote);
        res.send("Done")
    }
))
app.get("/api/users/destro/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await UserModel.deleteOne({id:searchTerm}); 
        res.send(searchTerm)
    }
)) 
app.get("/api/destro",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        await UserModel.deleteMany(); 
        await ProductModel.deleteMany();
        await AdminNoteModel.deleteMany();
        await BuyerRequestModel.deleteMany();
        res.send(" All Data Erased ! ")
    }
)) 
app.get("/api/seed",asyncHandler(
    async (req,res)=>{ 
        const AdminNoteCount =await AdminNoteModel.countDocuments();
        if(AdminNoteCount>0){ 
            await AdminNoteModel.deleteMany();
            await AdminNoteModel.create(sample_admin_note) 
        }else{
            await AdminNoteModel.create(sample_admin_note) 
        }
        const buyerRequestCount =await BuyerRequestModel.countDocuments();
        if(buyerRequestCount>0){
            await BuyerRequestModel.deleteMany(); 
            await BuyerRequestModel.create(sample_buyer_requests)
        }else{
            await BuyerRequestModel.create(sample_buyer_requests)
        }
        const prodCount =await ProductModel.countDocuments();
        if(prodCount>0){
            await ProductModel.deleteMany();
            await ProductModel.create(sample_prods) 
        }else{
            await ProductModel.create(sample_prods)
        }
        const userCount =await UserModel.countDocuments();
        if(userCount>0){
            await UserModel.deleteMany(); 
            await UserModel.create(sample_users)
        }else{
            await UserModel.create(sample_users)
        }  
        res.send("Data Seeding Done ! ")

        
        
    }
))
app.get("/api/products/searchName/:searchTerm",asyncHandler(
    async(req,res)=>{
        const searchTerm = req.params.searchTerm;
        const product =await ProductModel.find();
        const products = product
        .filter(products => products.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));
    
        res.send(products)
    }
)
)