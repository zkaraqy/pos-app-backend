import { sValidator } from "@hono/standard-validator";
import { Hono } from "hono";
import * as authController from "../controllers/auth.controller.js";

const authRoutes = new Hono();

authRoutes.post("/login", sValidator('json', authController.loginSchema), authController.loginController);

export default authRoutes;

