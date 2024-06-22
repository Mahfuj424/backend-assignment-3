import { Router } from "express";
import { RoomControllers } from "./room-controller";
import validateRequest from "../../middleware/validateRequest";
import { RoomValidations } from "./room-validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user-constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.createRoomValidationSchema),
  RoomControllers.createRoom
);

router.get("/:id", RoomControllers.getSingleRoom);
router.put(
  "/:id",auth(USER_ROLE.admin),
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom
);
router.get("/", RoomControllers.getAllRoom);
router.delete("/:id",auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
