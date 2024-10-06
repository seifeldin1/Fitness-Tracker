import {Sequelize} from "sequelize";

const database = new Sequelize(
    "fitnesstracker",
    "root",
    "$$eif@eldin_1020",
    {
        host: "127.0.0.1",
        dialect: "mysql",
    }
)

export default database