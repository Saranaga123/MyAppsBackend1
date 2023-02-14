import { Schema,model } from "mongoose";
export interface Houserent{
    id:string;
    name:string;
    accountNumber:string;
    bank:string;
     
}
export const HouserentSchema = new Schema<Houserent>(
    {
        name:{type:String, required:true},
        accountNumber:{type:String, required:true},
        bank:{type:String, required:true},
         
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
export const HouserentModel = model<Houserent>('houserent', HouserentSchema);