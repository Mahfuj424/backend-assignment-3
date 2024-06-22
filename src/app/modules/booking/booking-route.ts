import { Router } from "express";
import { BookingControllers } from "./booking-controller";
import validateRequest from "../../middleware/validateRequest";
import { BookingValidations } from "./booking-validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user-constant";

const router = Router();

router.post(
  "/bookings", auth(USER_ROLE.user),
  validateRequest(BookingValidations.bookingValidationSchema),
  BookingControllers.bookingRoom
);
router.get("/bookings",auth(USER_ROLE.admin), BookingControllers.getAllBooking);
router.get("/my-bookings", auth(USER_ROLE.user), BookingControllers.getMyBooking);
router.put("/bookings/:id",auth(USER_ROLE.admin), BookingControllers.updateBookingRoom);
router.delete("/bookings/:id",auth(USER_ROLE.admin), BookingControllers.deleteRoom);

export const BookingRoutes = router;
