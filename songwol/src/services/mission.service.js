import * as missionRepository from "../repositories/mission.repository.js";
import * as storeRepository from "../repositories/store.repository.js";

export const addMissionToStore = async (storeId, missionData) => {
  // 가게 존재 여부 확인
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 미션 추가
  const missionId = await missionRepository.createMission(storeId, missionData);
  return missionId;
};


export const storeMissionList = async (storeId) => {
  const missionList = await missionRepository.showStoreMission(storeId);
  return { ...missionList}
}

export const challengeMission = async (userId, missionId) => {
  // 미션 존재 여부 확인
  const mission = await missionRepository.findMissionById(missionId);
  if (!mission) {
    throw new Error("해당 미션이 존재하지 않습니다.");
  }

  // 이미 도전 중인지 확인
  const existingChallenge = await missionRepository.findChallengeByUserAndMission(userId, missionId);
  if (existingChallenge) {
    return { message: "이미 도전 중인 미션입니다." };
  }

  // 도전 생성
  const challengeId = await missionRepository.createChallenge(userId, missionId);
  return challengeId;
};


export const userMissionList = async (userId) => {
  const missionList = await missionRepository.showUserMission(userId);
  return { ...missionList }
}

export const userMissionSuccess = async (userId, missionId) => {
  const usermission = await missionRepository.success(userId, missionId);
  return { ...usermission }
}