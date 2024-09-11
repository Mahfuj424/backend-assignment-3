export type TRoom = {
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  images: string[];
  isDeleted: boolean;
};

export type TFilterOptions= {
  search?: string;
  capacity?: number;
  minPrice?: number;
  maxPrice?: number;
  sortby?: string;
  page?: number;
  limit?: number;
}

