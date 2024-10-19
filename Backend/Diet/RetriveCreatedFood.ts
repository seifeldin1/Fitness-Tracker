import { Request , Response } from "express"
import User from "../models/user"
import createdFood from "../models/createdFood"

export const GetCreatedFood = async(req:Request , res:Response)=>{
    const {user_Id} = req.params //passed in parameters

    if(!user_Id) res.status(404).json({
        message:"User ID is required",
    })

    try{
        const user = User.findOne({where:{id:user_Id}})
        if(!user) res.status(400).json({
            message:"User not found",
        })

        const created = createdFood.findAll({where:{userId:user_Id}})
        
        if(!created){
            res.status(400).json({
                message:"No created food found",
            })
        }

        res.status(201).json({
            message:"Created food found",
            food: created,
        })

    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err,
        })
    }

}