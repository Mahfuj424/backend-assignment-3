import { Router } from "express";
import { SlotControllers } from "./slot-controller";
import validateRequest from "../../middleware/validateRequest";
import { slotValidaitons } from "./slot-validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user-constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(slotValidaitons.createSlotSchema),
  SlotControllers.createSlots
);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(slotValidaitons.updateSlotSchema),
  SlotControllers.updateSlot
);

router.delete("/:id", auth(USER_ROLE.admin), SlotControllers.deleteSlot);
router.get("/availability", SlotControllers.getAvailableSlots);

export const SlotRoutes = router;
