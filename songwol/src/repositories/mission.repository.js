import { prisma } from "../db.config.js";

export const createMission = async (storeId, missionData) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: storeId,
        task: missionData.task,
        savePoints: missionData.savePoints,
        deadline: new Date(missionData.deadline),
      },
    });
    return mission;
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const findMissionById = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: { id: missionId },
    });
    return mission;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
  }
};


export const showStoreMission = async (storeId) => {
  try {
    const showMission = await prisma.mission.findMany({
      where: { id: storeId },
    });
    return showMission;
  } catch (error) {
    throw new Error(`가게 미션 조회 중 오류가 발생했습니다.: ${error.message}`)
  }
};