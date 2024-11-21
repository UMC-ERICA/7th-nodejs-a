import { responseFromMission } from "../dtos/mission.dto.js";
import { NotFoundRestaurant } from "../error.js";
import { 
    addMission,
    getMission
} from "../repositories/mission.repository.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";

export const createMission = async (data) => {  
  try{
    const checkRestaurantId = await getRestaurant(data.restaurant_id)
    if(!checkRestaurantId){
      throw new NotFoundRestaurant("not found restaurant", null);
    }

    const joinMissionId = await addMission({
      restaurant_id: data.restaurant_id,
      mission_name: data.name,
      deadline: data.deadline,
      created_date: data.create_at,
      mission_point: data.mission_point
    });

    const mission = await getMission(joinMissionId);

    return responseFromMission(mission);
  }
  catch(error){
    console.error("error at createMission", null);
    throw error;
  }
};