import { Response , Request } from "express";
import User from "../models/user";
import createdFood from "../models/createdFood";

//order=> food name , serving size , units , calories 
export const AddFood = async(req:Request , res:Response)=>{
    const {food_name , seriving_size , the_unit , food_calories , user_Id} = req.body;

    if(!(food_name||seriving_size||the_unit||food_calories))
        return res.status(400).json({message:"Please fill all the fields"})

    if(!user_Id) return res.status(400).json({message:"User Id should be provided"})

    try{
        const user = await User.findOne({where:{id:user_Id}})
        if(!user) return res.status(400).json({message:"User not found"})
        
        const newCreatedFood = await createdFood.create({
            foodName: food_name,
            servingSize: seriving_size,
            unit: the_unit,
            foodCalories: food_calories,
            userId: user_Id, //here we link the created with the user 
        })

        return res.status(201).json({
            message: "Food added successfully",
            food: newCreatedFood,
        })

    }catch(err){
        return res.status(500).json({
            message: "Failed to add food",
            error: err,
        })
    }
}