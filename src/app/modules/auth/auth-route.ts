import { Router } from "express";
import { AuthControllers } from "./auth-controller";
import validateRequest from "../../middleware/validateRequest";
import loginValidation from "./auth-validation";

const router = Router();

router.post("/login", validateRequest(loginValidation), AuthControllers.logInUser);

export const AuthRotues = router;