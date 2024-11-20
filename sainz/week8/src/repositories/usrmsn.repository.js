import { prisma } from '../db.config.js';

export const AddUserMSN = async (data) => {
  try {
    const existingMission = await prisma.user_mission.findUnique({
      where: {
        user_mission_id: data.user_mission_id,
      },
    });

    if (existingMission) {
      return null;
    }

    const createdMission = await prisma.user_mission.create({
      data: {
        user_id: data.user_id,
        mission_id: data.mission_id,
        status: data.status,
      },
    });

    return createdMission.user_mission_id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getUserMSN = async (user_mission_id) => {
  try {
    const userMission = await prisma.user_mission.findUnique({
      where: {
        user_mission_id: user_mission_id,
      },
    });

    if (!userMission) {
      return null;
    }

    return userMission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
