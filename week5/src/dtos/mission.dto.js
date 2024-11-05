export const bodyToMission = (body) => {
    const create_at = new Date();
    const deadline = new Date(body.deadline)
  
    return {
        restaurant_id: body.restaurant_id,
        name: body.name,
        deadline,
        create_at,
        mission_point: body.mission_point
    };
  };
  
  export const responseFromMission = (mission) => {
      return {
        restaurant_id: mission.restaurant_id,
        name: mission.name,
        deadline: mission.deadline,
        create_at: mission.deadline,
        mission_point: mission.mission_point
      };
  };