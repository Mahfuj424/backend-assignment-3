import { Router } from "express";
import { UserControllers } from "./user-controller";
import validateRequest from "../../middleware/validateRequest";
import UserValidationSchema from "./user-validation";
// import validateRequest from "../../middleware/validateRequest";
// import userValidationSchema from "./user-validation";

const router = Router();

router.post("/signup", validateRequest(UserValidationSchema), UserControllers.createUser);

export const UserRotues = router;
