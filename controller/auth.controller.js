import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
export const registerUser = async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;

        // validation
        if(!name || !email || !password ||!role){
            return res.status(400).json({
                message : "All fields are required"
            })
        }

        // check user is not 

        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(400).json({
                message : "User already exists"
            })
        }


         const user = await User.create({
            name,
            email,
            password,
            role
        });

    // 5. response
            res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
            });
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}




export const userLogin = async (req,res)=>{
    try {

        // take input as email + password 

        const {email,password} = req.body;

        // validation for fields are required other this phase also achive in frontend 
        // now skip this 

        // find user 
        
        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({
                message :"Invalid email or password"
            })
        }
        
        // check password 

        const isMatch = await user.matchPassword(password)

        if(!isMatch){
            return res.status(400).json({
                message:"Invalid Password"
            })
        }


        // ✅ GENERATE TOKEN
    const token = generateToken(user._id, user.role);
        // success respomce

        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}