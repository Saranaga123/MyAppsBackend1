import { Schema,model } from "mongoose";
export interface User{
    id:string;
    name:string;
    nic:string;
    type:string;
    district:string;
    email:string;
    role:string;
    password:string;
    tp:string;
    add1:string;
    add2:string;
    add3:string;
    photo:string;
}
export const UserSchema = new Schema<User>(
    {
        name:{type:String, required:true},
        nic:{type:String, required:true},
        type:{type:String, required:true},
        district:{type:String, required:true},
        email:{type:String, required:true},
        role:{type:String, required:true},
        password:{type:String, required:true},
        tp:{type:String, required:true},
        add1:{type:String, required:true},
        add2:{type:String, required:true},
        add3:{type:String, required:true},
        photo:{type:String, required:true},

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
export const UserModel = model<User>('user', UserSchema);