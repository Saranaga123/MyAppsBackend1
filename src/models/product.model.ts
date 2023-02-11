import { Schema,model } from "mongoose";
export interface Product{
    id:string;
    name:string; 
    photo:string;
    status:string;
    price:string;
    email:string;
    fname:string;
    fcontact:string;

}
export const ProductSchema = new Schema<Product>(
    {
        name:{type:String, required:true}, 
        photo:{type:String, required:true},
        status:{type:String, required:true},
        price:{type:String, required:true},
        email:{type:String, required:true},
        fname:{type:String, required:true},
        fcontact:{type:String, required:true}
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:false
        },
        timestamps:true
    }
);
export const ProductModel = model<Product>('product', ProductSchema);