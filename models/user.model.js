import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","analyst","viewer"],
        default:"viewer"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{timestamps:true})

// before save hash password
userSchema.pre("save", async function () {
  
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});


//  compare login password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User",userSchema)

export default User;