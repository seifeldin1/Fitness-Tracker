import {Response , Request} from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

export const signup = async(req:Request , res:Response)=>{
    const{first_name , last_name , username , 
        email , password , gender , 
        age , phone_number} = req.body

    if(!first_name || !last_name || !username 
        || !email || !password || !gender 
        || !age || !phone_number){
            return res.status(400).json({
                message: "Please fill in the required fields",
            })
        }

    try{

        var existingUser = await User.findOne({where:email})
        if(existingUser){
            return res.status(400).json({
                message: "Email already exists",
            })
        }

        existingUser = await User.findOne({where:username})
        if(existingUser){
            return res.status(400).json({
                message: "Username already exists",
            })
        }
        
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password , salt)

        if(phone_number){
            const newUser = await User.create(
                {
                    first_name,
                    last_name, 
                    username,
                    email ,
                    password:hashedPassword ,
                    gender ,
                    age,
                    phone_number,
                }
            )
            return res.status(200).json({message: "User created successfully" , user: newUser})
        }
        const newUser = await User.create(
                {
                    first_name,
                    last_name, 
                    username,
                    email ,
                    password:hashedPassword ,
                    gender ,
                    age,
                }
        )
        

        return res.status(200).json({message: "User created successfully" , user: newUser})
        
    }
    catch(err){
        return res.status(500).json({
            message: "Error in signup",
            error: err,
        })
    }
}
