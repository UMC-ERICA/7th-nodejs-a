export const bodyToUserMission = (body) => {
  return {
    user_id: body.user_id,
    mission_id: body.mission_id,
    satus: body.status,
  };
};
