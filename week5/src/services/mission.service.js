import { responseFromMission } from "../dtos/mission.dto.js";
import { 
    addMission,
    getMission
} from "../repositories/mission.repository.js";

export const createMission = async (data) => {
    const joinMissionId = await addMission({
      restaurant_id: data.restaurant_id,
      name: data.name,
      deadline: data.deadline,
      create_at: data.create_at,
      mission_point: data.mission_point
    });

    const mission = await getMission(joinMissionId);

    return responseFromMission(mission);
};