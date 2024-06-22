import { Router } from 'express';
import { UserRotues } from '../modules/user/user-route';
import { RoomRoutes } from '../modules/room/room-route';
import { AuthRotues } from '../modules/auth/auth-route';
import { SlotRoutes } from '../modules/slots/slot-route';
import { BookingRoutes } from '../modules/booking/booking-route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
