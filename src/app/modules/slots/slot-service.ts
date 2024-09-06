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
  const query: any = { isBooked: false, isDeleted: false };
  if (date) query.date = date;
  if (roomId) query.room = roomId;

  const slots = await Slot.find(query).populate("room");
  return slots;
};

const updateSlotFromDB = async (id: string, payload: Partial<TSlot>) => {
  const { room, date, startTime, endTime } = payload;

  if (!room || !date || !startTime || !endTime) {
    throw new Error("Room, date, startTime, and endTime are required.");
  }

  // Check if any slot with the same room, date, and overlapping time exists
  const conflictingSlot = await Slot.findOne({
    _id: { $ne: id }, // Exclude the current slot being updated
    room,
    date,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, // Time overlap check
    ],
  });

  if (conflictingSlot) {
    throw new Error(
      `A slot for room ${room} on date ${date} from ${startTime} to ${endTime} already exists.`
    );
  }

  // Calculate time difference
  const startMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);
  const totalDuration = endMinutes - startMinutes;

  const slotDuration = 60; // 60 minutes
  if (totalDuration > slotDuration) {
    // If time difference is more than 1 hour, create additional slots
    await Slot.findByIdAndDelete(id); // Remove the current slot before adding new ones
    const numberOfSlots = totalDuration / slotDuration;
    const slots = [];

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

      const newSlot = new Slot({
        room,
        date,
        startTime: `${slotStartHours}:${slotStartMinutes}`,
        endTime: `${slotEndHours}:${slotEndMinutes}`,
        isBooked: false,
      });
      await newSlot.save();
      slots.push(newSlot);
    }

    return slots; // Return the new slots
  }

  // Update the slot normally if no conflict and the time difference is less than or equal to 1 hour
  const updatedSlot = await Slot.findByIdAndUpdate(
    { _id: id },
    { $set: payload },
    { new: true, runValidators: true }
  );

  return updatedSlot;
};

const deleteSlotFromDB = async (id: string) => {
  const result = await Slot.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true, runValidators: true }
  );
  return result;
};

export const SlotServices = {
  createSlotsIntoDB,
  getAvailableSlotsIntoDB,
  updateSlotFromDB,
  deleteSlotFromDB,
};
