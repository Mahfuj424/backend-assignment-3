import { Router } from "express";
import { BookingControllers } from "./booking-controller";

const router = Router();

router.post("/bookings", BookingControllers.bookingRoom);
router.get("/bookings", BookingControllers.getAllBooking);
router.get("/my-bookings", BookingControllers.getMyBooking);


export const BookingRoutes = router;