import { Router } from "express";
import { login, signUp } from "../controllers/auth.js";

const authRoute = Router();

authRoute.post("/signup",signUp);
authRoute.post("/login",login);

export default authRoute;