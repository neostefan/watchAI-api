import { Router } from "express";
import { RegistrationHandler, LogInHandler } from "../controllers";

const router = Router()

// POST /auth/register
router.post("/register", RegistrationHandler)

// POST /auth/login
router.post("/login", LogInHandler)

export default router