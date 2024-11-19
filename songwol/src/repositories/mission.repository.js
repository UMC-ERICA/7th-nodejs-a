import { prisma } from "../db.config.js";
import { MissionStatus } from '@prisma/client';

// 가게별 미션 생성
export const createMission = async (storeId, missionData) => {
  const mission = await prisma.mission.create({
    data: {
      storeId: storeId,
      task: missionData.task,
      savePoints: missionData.savePoints,
      deadline: new Date(missionData.deadline),
    },
  });
  return mission;
};

// 미션 찾기
export const findMissionById = async (missionId) => {
  const mission = await prisma.mission.findUnique({
    where: { id: missionId },
  });
  return mission;
};

// 가게별 미션 조회
export const showStoreMission = async (storeId) => {
  const showMission = await prisma.mission.findMany({
    where: { id: storeId },
  });
  return showMission;
};

//유저미션별 조회
export const findChallengeByUserAndMission = async (userId, missionId) => {
  const challenge = await prisma.userMission.findFirst({
    where: {
      userId: userId,
      missionId: missionId,
    },
  });
  
  return challenge !== null;
};

// 유저별 미션 생성
export const createChallenge = async (userId, missionId) => {
  const challenge = await prisma.userMission.create({
    data: {
      userId: userId,
      missionId: missionId,
    },
  });
  return challenge.id;
};

// 유저별 미션 조회
export const showUserMission = async (userId) => {
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
};

// 미션 성공 처리
export const success = async(userId, missionId) => {
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
  
  return updatedMission;
}