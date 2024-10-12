import  {Router} from "express";
import { signup } from "../controllers/signup";
import { login } from "../controllers/login";

const route = Router()

route.post('/signup' , signup)

route.post('/login' , login)

export default route