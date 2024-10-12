import express from "express"
import database from "./databases/config"
import route from "./routes/routes"

const PORT = 3000
const app = express()


database.authenticate()
.then(() => console.log("Database connected"))
.catch((err) => console.log(err))

const startServer= async()=>{
    try{
        await database.sync({alter:true})
        console.log("Database has been created successfuly!")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
        app.use(express.json())

        app.use('/auth' , route)
    }
    catch(err){
        console.log("Error: " , err)
    }
}

startServer()
