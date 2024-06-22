import { Router } from "express";
import { SlotControllers } from "./slot-controller";

const router = Router();

router.post("/", SlotControllers.createSlots);
router.get("/availability", SlotControllers.getAvailableSlots);


export const SlotRoutes = router;