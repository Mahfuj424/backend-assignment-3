import { TFavorite } from "./favorite-interface";
import { Favorite } from "./favorite.model";

const addFavoriteRoomIntoDB = async (payload: TFavorite) => {
  const result = await Favorite.create(payload);
  return result;
};

export const FavoriteRoomServices = {
  addFavoriteRoomIntoDB,
};
