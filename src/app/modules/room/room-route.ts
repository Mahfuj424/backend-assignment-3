import { Router } from "express";
import { RoomControllers } from "./room-controller";
// import validateRequest from "../../middleware/validateRequest";
// import { RoomValidations } from "./room-validation";

const router = Router();

router.post("/", RoomControllers.createRoom);

router.get('/:id', RoomControllers.getSingleRoom)
router.put('/:id', RoomControllers.updateRoom)
router.get('/', RoomControllers.getAllRoom)
router.delete('/:id', RoomControllers.deleteRoom)

export const RoomRoutes = router;
