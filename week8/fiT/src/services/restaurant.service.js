import { responseFromRestaurant } from "../dtos/restaurant.dto.js";
import { alreayExistRestaurant, NotFoundMissionOfRestaurant } from "../error.js";
import { getMissionOfRestaurant} from "../repositories/restaurant.repository.js"
import {
    addRestaurant,
    getRestaurant
} from "../repositories/restaurant.repository.js"


export const createRestaurant = async (data) => {
  try{
    const joinRestaurantId = await addRestaurant({ 
        restaurant_name: data.restaurant_name,
        address: data.address,
        type: data.type,
        created_date: data.created_date,
        phone_number: data.phone_number,
    });

    //중복체크
    if (joinRestaurantId === null) {
      throw new alreayExistRestaurant("That restaurant alreay exists", null);
    }
  
    const restaurant = await getRestaurant(joinRestaurantId);
  
    return responseFromRestaurant(restaurant);
  }
  catch (error){
    console.error("error at createRestaurant", null);
    throw error;
  }
};

export const findMissionOfRestaurant = async (restaurantId) => {
    try {
      const missionlist = await getMissionOfRestaurant(restaurantId);  
  
      if (missionlist.length === 0) {
        throw new NotFoundMissionOfRestaurant("That restaurant has no mission", null);
      }
  
      return {
        success: true,
        data: missionlist,  
      };
    } 
    catch (error) {
      console.error("error at findMissionOfRestaurant", null);
    throw error;
    }
  };