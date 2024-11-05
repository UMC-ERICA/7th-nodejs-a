import { prisma } from "../db.config.js";
import { MissionStatus } from '@prisma/client';

export const findChallengeByUserAndMission = async (userId, missionId) => {
  try {
    const challenge = await prisma.userMission.findFirst({
      where: {
        userId: userId,
        missionId: missionId,
      },
    });
    
    return challenge !== null;
  } catch (err) {
    throw new Error(`도전 조회 중 오류가 발생했습니다: ${err.message}`);
  }
};


export const createChallenge = async (userId, missionId) => {
  try {
    const challenge = await prisma.userMission.create({
      data: {
        userId: userId,
        missionId: missionId,
      },
    });
    return challenge.id;
  } catch (err) {
    throw new Error(`도전 생성 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const showUserMission = async (userId) => {
  try {
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      throw new Error("유효한 userId가 아닙니다.");
    }

    const showMission = await prisma.mission.findMany({
      where: {
        userMissions: {
          some: {
            userId: numericUserId,
          },
        },
        success: MissionStatus.IN_PROGRESS,
      },
    });
    return showMission;
  } catch (error) {
    throw new Error(`가게 미션 조회 중 오류가 발생했습니다.: ${error.message}`)
  }
};

export const success = async(userId, missionId) => {
  try {
    const updatedMission = await prisma.mission.updateMany({
      where: {
        id: missionId,
        userMissions: {
          some: {
            userId: userId,
          },
        },
        success: MissionStatus.IN_PROGRESS,
      },
      data: {
        success: MissionStatus.COMPLETED,
      },
    });

    if (updatedMission.count === 0) {
      throw new Error("missionId가 유효하지 않습니다.");
    }
    
  } catch (error) {
    throw new Error(`미션 성공 변경 중 오류가 발생했습니다.: ${error.message}`)
  }
}