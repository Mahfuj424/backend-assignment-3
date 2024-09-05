/* eslint-disable @typescript-eslint/no-explicit-any */
import { TSlot } from "./slot-interface";
import { Slot } from "./slot-model";

const createSlotsIntoDB = async (payload: TSlot) => {
  const { room, date, startTime, endTime } = payload;

  const existingSlots = await Slot.find({
    room,
    date,
    $or: [{ startTime: { $lt: endTime }, endTime: { $gt: startTime } }],
  });

  if (existingSlots.length > 0) {
    throw new Error(
      `Slots for room ${room} on date ${date} and time ${startTime} to ${endTime} already exist.`
    );
  }

  const slots = [];
  const slotDuration = 60; // 60 minutes

  // Convert time to minutes since midnight
  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  const totalDuration = endMinutes - startMinutes;

  const numberOfSlots = totalDuration / slotDuration;

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = startMinutes + i * slotDuration;
    const slotEndTime = slotStartTime + slotDuration;

    const slotStartHours = Math.floor(slotStartTime / 60)
      .toString()
      .padStart(2, "0");
    const slotStartMinutes = (slotStartTime % 60).toString().padStart(2, "0");
    const slotEndHours = Math.floor(slotEndTime / 60)
      .toString()
      .padStart(2, "0");
    const slotEndMinutes = (slotEndTime % 60).toString().padStart(2, "0");

    const slot = new Slot({
      room,
      date,
      startTime: `${slotStartHours}:${slotStartMinutes}`,
      endTime: `${slotEndHours}:${slotEndMinutes}`,
      isBooked: false,
    });

    await slot.save();
    slots.push(slot);
  }

  return slots;
};

const getAvailableSlotsIntoDB = async (date: string, roomId: string) => {
  const query: any = { isBooked: false };
  if (date) query.date = date;
  if (roomId) query.room = roomId;

  const slots = await Slot.find(query).populate("room");
  return slots;
};

const updateSlotFromDB = async (id: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true }
  );
  return result;
};

const deleteSlotFromDB = async (id: string) => {
  const result = await Slot.findByIdAndDelete(
    { _id: id },
  );
  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAvailableSlotsIntoDB,
  updateSlotFromDB,
  deleteSlotFromDB
};
