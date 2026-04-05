import express from "express";
import { registerUser, userLogin } from "../controller/auth.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

const routes = express.Router();

routes.post("/register",registerUser)
routes.post("/login",userLogin);


export default routes