import { Types } from "mongoose";

export type TBooking = {
  transaction_id: string ;
  room: Types.ObjectId;
  slots: Types.ObjectId[];
  user: Types.ObjectId;
  date: string;
  totalAmount?: number;
  isConfirmed?: boolean | string;
  isDeleted?: boolean;
};
