import { Request, Response } from "express";
import { createRoomValidationSchema } from "./room-validation";
import { RoomServices } from "./room-service";
import httpStatus from "http-status";

const createRoom = async (req: Request, res: Response) => {
  try {
    const roomData = req.body;
    const zodParseData = createRoomValidationSchema.parse(roomData);

    const result = await RoomServices.createRoomIntoDB(zodParseData);
    res.status(201).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

const getSingleRoom = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await RoomServices.getSingleRoomFromDB(id);
    res.status(201).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieved Room",
    });
  }
};

const getAllRoom = async (req: Request, res: Response) => {
  try {
    const result = await RoomServices.getAllRoomFromDB();
    res.status(201).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieved Room",
    });
  }
};

const updateRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const result = await RoomServices.updateRoomFromDB(id, updatedData);

    res.status(201).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update Room",
    });
  }
};

const deleteRoom = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await RoomServices.deleteRoomFromDB(id);
    res.status(201).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "Room deleted successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Room",
    });
  }
};

export const RoomControllers = {
  createRoom,
  getSingleRoom,
  getAllRoom,
  updateRoom,
  deleteRoom
};
