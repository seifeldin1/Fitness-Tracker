import { DataType, DataTypes, Model } from "sequelize";
import database from "../databases/config";


class User extends Model{
    public id !: number
    public first_name !: string
    public last_name !: string
    public username !: string
    public email !: string
    public password !: string
    public gender!:string
    public age!:number

    public phone_number?:string
    
    public readonly createdAt !: Date
    public readonly updatedAt !: Date
    public readonly deletedAt!: Date|null
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull:false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        username:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        phone_number:{
            type:DataTypes.STRING,
            allowNull:true,
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
    }, {
        sequelize: database,
        modelName: 'user',
    }
)

export default User