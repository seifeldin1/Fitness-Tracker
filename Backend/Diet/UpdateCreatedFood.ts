import { Request , Response } from "express";
import User from "../models/user";
import createdFood from "../models/createdFood";

//updates by foodId passed in params
//only edits the fields he need to update so it is optional to only update name for example 
export const UpdateCreatedFood = async(req:Request , res:Response)=>{
    const {Food_ID} = req.params
    const {NewFoodName ,ServingSize , TheUnit , FoodCalories , UserID } = req.body

    /*if(!(NewFoodName||ServingSize||TheUnit||FoodCalories)) 
        return res.status(400).json({ message:"Please fill all fields" })*/
    //if we want to restrict it 

    if(!UserID) return res.status(400).json({
        message:"userID should be given",
    })

    if(!Food_ID) return res.status(400).json({
        message:"Food ID should be given",
    })

    try{
        const user = User.findOne({where:{id:UserID}})

        if(!user) return res.status(404).json({
            message:"User not found",
        })
        const food = await createdFood.findOne({where:{id:Food_ID}})

        if(!food) return res.status(404).json({
            message:"Food not found",
        })

        food.foodName = NewFoodName || food.foodName;
        food.servingSize = ServingSize || food.servingSize;
        food.unit = TheUnit || food.unit;
        food.calories = FoodCalories || food.calories;
        
        await food.save(); //saving updates

        return res.status(201).json({
            message:"Food updated successfully",
            updated: food,
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            error:err,
        })
    }

}