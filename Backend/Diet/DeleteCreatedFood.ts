import { Request , Response } from "express";
import createdFood from "../models/createdFood";


//food id passed in parameters 
export const DeleteCreatedFood = async(req:Request , res:Response)=>{
    const {Food_ID} = req.params;
    
    if(!Food_ID) return res.status(400).json({
        message:"Food ID is required"
    })

    try{
        const food = await createdFood.findOne({where: {id:Food_ID}});
        if(!food) return res.status(404).json({
            message:"Food not found"
        })

        await food.destroy(); //delete food 
        return res.status(201).json({
            message:"Food deleted successfully"
        })
    } catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            error: err,
        })
    }
}