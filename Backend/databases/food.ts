import {Sequelize} from "sequelize";

const createdFoodDatabase = new Sequelize(
    "food_fitness_tracker",
    "root",
    "$$eif@eldin_1020",
    {
        host: "127.0.0.1",
        dialect: "mysql",
    }
)

export default createdFoodDatabase