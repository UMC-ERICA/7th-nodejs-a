import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import {
    addRestaurant,
    getRestaurant
} from "../repositories/restaurant.repository.js"


export const createRestaurant = async (data) => {
    const joinRestaurantId = await addRestaurant({
        name: data.name,
        address: data.address,
        type: data.type,
        create_at: data.create_at,
        phone_number: data.phone_number,
    });
  
    if (joinRestaurantId === null) {
      throw new Error("이미 존재하는 식당입니다.");
    }
  
    const restaurant = await getRestaurant(joinRestaurantId);
  
    return responseFromRestaurant(restaurant);
  };