import { Request , Response } from "express";
import bcrypt from 'bcrypt'
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { JWT_Secure_Key } from "./secret";

export const login = async(req:Request , res:Response)=>{
    const {email , username , password} = req.body

    if(!email && !username){
        return res.status(400).json({message:'Please enter your email or username'})
    }

    try{
        var user
        if(email){
            user = await User.findOne({where:email})
        
            if(!user){
                return res.status(400).json({message:'User not found , Email is incorrect'})
            }
        }else if(username){
            user = await User.findOne({where:username})
            if(!user){
                return res.status(400).json({message:'User not found , Username is incorrect'})
            }
        }

        if(user){
            const passwordMatch = bcrypt.compare(password , user.password)
            if(!passwordMatch){
                return res.status(400).json({message:'Password is incorrect'})
            }

        const token = jwt.sign({id:user.id , username:user.username} , JWT_Secure_Key , {expiresIn:'24h'})

        res.cookie('token' , token , {httpOnly:true ,maxAge:3600000*24 ,secure:true ,}) //24 hours

            res.status(200).json({
               message:'Login Successfull',
               email: user.email,
                username: user.username,
                password:user.password,
                token:token,
            })
        }
    }catch(err){
        res.status(400).json({
            message:'Error in login',
            error:err,
        })
    }
   
}