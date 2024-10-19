import { DataTypes , Model } from "sequelize";
import createdFoodDatabase from "../databases/food";
import User from "./user";

class createdFood extends Model{
    public id !: number
    public foodName!: string 
    public servingSize !: number //1 , 2, 3, 4, 5, ect... , Note: not how much are taken from this food , if chosen 5 for example anf the unit is gram then it means 5 grams
    public unit!:string

    public userId !: number //foreign key

    public calories!: number // ToDo later: should be optional as we can calculate it using a formula i guess 

    public readonly createdAt !: Date
    public readonly updatedAt !: Date
    public readonly deletedAt!: Date|null
}

createdFood.init(
    {
        id:{
            autoIncrement:true,
            allowNull:false,
            type: DataTypes.INTEGER,
            unique:true,
            primaryKey:true,
        },
        foodName:{
            allowNull:false,
            type:DataTypes.STRING,
            validate:{
                is:['[a-z]' , 'i'],
                isIn:{
                    args:[['en']],
                    msg:"Food must be enetered in english",
                }

            },
        },
        servingSize:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                max:20,
            },
        },
        unit:{
            type: DataTypes.STRING,
            allowNull:false,
            //validation needed here
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,  // Foreign key references User model
                key: 'id',
            },
            onDelete: 'CASCADE',  // If the user is deleted, their food entries are deleted
        },
        calories:{
            type:DataTypes.INTEGER,
            allowNull:false,
            validate:{
                max:5000,
            },
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        deletedAt:{
            type:DataTypes.DATE,
            allowNull:true,
        },
    },
    {
        sequelize: createdFoodDatabase,
        modelName: 'createdFood',
    }
)


createdFood.belongsTo(User , {foreignKey: "userId"})

export default createdFood

