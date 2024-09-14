/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFilterOptions, TRoom } from "./room-interface";
import { Room } from "./room-model";

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);
  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);
  return result;
};

const getAllRoomFromDB = async (filterOptions: TFilterOptions) => {
  const {
    search,
    capacity,
    minPrice,
    maxPrice,
    sortby = "Default", // Set default value for sortBy
  } = filterOptions;

  // Create the filter object
  const filters: any = { isDeleted: false };

  // Search filter (by room name)
  if (search) {
    filters.name = { $regex: search, $options: "i" }; // Case-insensitive regex search
  }

  // Capacity filter
  if (capacity) {
    filters.capacity = { $lte: capacity }; // Filter rooms that can handle at least the specified capacity
  }

  // Price filter
  if (minPrice || maxPrice) {
    filters.pricePerSlot = {
      ...(minPrice && { $gte: minPrice }), // Filter by minimum price if specified
      ...(maxPrice && { $lte: maxPrice }), // Filter by maximum price if specified
    };
  }

  // Sorting options
  const sortOptions: any = {};
  if (sortby === "Price - High to Low") {
    sortOptions.pricePerSlot = -1;
  } else if (sortby === "Price - Low to High") {
    sortOptions.pricePerSlot = 1;
  } else if (sortby === "new to old") {
    sortOptions.createdAt = -1;
  } else if (sortby === "old to new") {
    sortOptions.createdAt = 1;
  }

  // Fetch rooms with filters and sorting
  const rooms = await Room.find(filters).sort(sortOptions);

  // Return the rooms directly without pagination
  return {
    data: rooms,
  };
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
