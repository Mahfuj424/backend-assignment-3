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
    page = 1,
    limit = 6,
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
    sortOptions.pricePerSlot = -1; // Sort by price in descending order
  } else if (sortby === "Price - Low to High") {
    sortOptions.pricePerSlot = 1; // Sort by price in ascending order
  } else if (sortby === "new to old") {
    sortOptions.createdAt = -1; // Sort by price in ascending order
  } else if (sortby === "old to new") {
    sortOptions.createdAt = 1; // Sort by price in ascending order
  }
  // For "Default", no sorting will be applied, meaning natural order will be used.

  // Pagination logic
  const skip = (page - 1) * limit;
  const totalRooms = await Room.countDocuments(filters); // Total count for pagination

  // Fetch rooms with filters, sorting, and pagination
  const rooms = await Room.find(filters)
    .sort(sortOptions) // This will apply sorting only if sortOptions is not empty
    .skip(skip)
    .limit(limit);

  return {
    data: rooms,
    meta: {
      totalRooms,
      currentPage: page,
      totalPages: Math.ceil(totalRooms / limit),
    },
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
