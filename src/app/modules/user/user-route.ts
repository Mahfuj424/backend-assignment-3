import { Router } from "express";
import { UserControllers } from "./user-controller";
// import validateRequest from "../../middleware/validateRequest";
// import userValidationSchema from "./user-validation";

const router = Router();

router.post("/signup", UserControllers.createUser);

export const UserRotues = router;
