import { TRoom } from "./room-interface";
import { Room } from "./room-model";

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const getAllRoomFromDB = async () => {
  const result = await Room.find({ isDeleted: false });
  return result;
};

const updateRoomFromDB = async (id: string, payload: Partial<TRoom>) => {
  const result = await Room.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true }
  );

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getSingleRoomFromDB,
  getAllRoomFromDB,
  updateRoomFromDB,
  deleteRoomFromDB,
};
