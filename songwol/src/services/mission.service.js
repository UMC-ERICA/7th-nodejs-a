import * as missionRepository from "../repositories/mission.repository.js";
import * as storeRepository from "../repositories/store.repository.js";

// 가게에 미션 추가
export const addMissionToStore = async (storeId, missionData) => {
  // 가게 존재 여부 확인
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  const missionId = await missionRepository.createMission(storeId, missionData);
  return missionId;
};

// 가게별 미션 조회
export const storeMissionList = async (storeId) => {
  const missionList = await missionRepository.showStoreMission(storeId);
  return { ...missionList}
}

// 유저에 미션추가
export const challengeMission = async (challengeData) => {
  const { userId, missionId } = challengeData;

  // 1. 미션 존재 여부 확인
  const mission = await missionRepository.findMissionById(missionId);
  if (!mission) {
    throw new Error("해당 미션이 존재하지 않습니다.");
  }

  // 2. 이미 도전 중인지 확인
  const existingChallenge = await missionRepository.findChallengeByUserAndMission(userId, missionId);
  if (existingChallenge) {
    return {
      success: false,
      message: "이미 도전 중인 미션입니다.",
    };
  }

  // 3. 도전 생성
  const challengeId = await missionRepository.createChallenge(userId, missionId);
  return {
    success: true,
    challengeId,
    message: "미션 도전이 성공적으로 추가되었습니다.",
  };
};

// 유저별 미션 조회
export const userMissionList = async (userId) => {
  const missionList = await missionRepository.showUserMission(userId);
  return { ...missionList }
}

// 미션 성공 처리
export const userMissionSuccess = async (userId, missionId) => {
  const usermission = await missionRepository.success(userId, missionId);
  return { ...usermission }
}