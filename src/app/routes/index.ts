import { Router } from 'express';
import { RoomRoutes } from '../modules/room/room-route';
import { AuthRotues } from '../modules/auth/auth-route';
import { SlotRoutes } from '../modules/slots/slot-route';
import { BookingRoutes } from '../modules/booking/booking-route';
import { UserRotues } from '../modules/user/user-route';
import { paymentRoutes } from '../modules/payment/paymentRoute';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRotues,
  },
  {
    path: '/auth',
    route: AuthRotues,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/',
    route: BookingRoutes,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
