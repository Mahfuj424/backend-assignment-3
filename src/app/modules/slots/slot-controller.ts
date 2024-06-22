import { Request, Response } from "express";
import { SlotServices } from "./slot-service";

/* eslint-disable @typescript-eslint/no-explicit-any */
const createSlots = async (req: Request, res: Response) => {
  try {
    const { room, date, startTime, endTime } = req.body;

    // const slotValidationWithZod = slotValidaitons.createSlotSchema.parse(
    //   room,
    //   date,
    //   startTime,
    //   endTime
    // );

    const slots = await SlotServices.createSlotsIntoDB(
      room,
      date,
      startTime,
      endTime
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Slots created successfully",
      data: slots,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { date, roomId } = req.query;
    const slots = await  SlotServices.getAvailableSlotsIntoDB(date, roomId);
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: slots,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const SlotControllers = {
  createSlots,
  getAvailableSlots,
};
