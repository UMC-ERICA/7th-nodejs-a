import * as missionRepository from "../repositories/mission.repository.js";
import * as storeRepository from "../repositories/store.repository.js";
import { undefinedStoreError, undefinedUserError, undefinedMissionError, alreadyMissionError } from "../errors.js";

// 가게에 미션 추가
export const addMissionToStore = async (storeId, missionData) => {
  // 가게 존재 여부 확인
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new undefinedStoreError("해당 가게가 존재하지 않습니다.", storeId);
  }

  const missionId = await missionRepository.createMission(storeId, missionData);
  return missionId;
};

// 가게별 미션 조회
export const storeMissionList = async (storeId) => {
  // 가게 존재 여부 확인
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new undefinedStoreError("해당 가게가 존재하지 않습니다.", storeId);
  }

  const missionList = await missionRepository.showStoreMission(storeId);
  return missionList;
}

// 유저에 미션추가
export const challengeMission = async (challengeData) => {
  const { userId, missionId } = challengeData;

  // 미션 존재 여부 확인
  const mission = await missionRepository.findMissionById(missionId);
  if (!mission) {
    throw new undefinedMissionError("해당 미션이 존재하지 않습니다.", challengeData);
  }

  // 이미 도전 중인지 확인
  const existingChallenge = await missionRepository.findChallengeByUserAndMission(userId, missionId);
  if (existingChallenge) {
    throw new alreadyMissionError("이미 도전 중인 미션입니다.", challengeData)
  }

  const challengeId = await missionRepository.createChallenge(userId, missionId);
  return challengeId;
};

// 유저별 미션 조회
export const userMissionList = async (userId) => {
  // 유저 존재 여부 확인
  const user = await storeRepository.findStoreById(userId);
  if (!user) {
    throw new undefinedUserError("해당 유저가 존재하지 않습니다.", userId);
  }

  const missionList = await missionRepository.showUserMission(userId);
  return missionList;
}

// 미션 성공 처리
export const userMissionSuccess = async (userId, missionId) => {
  const usermission = await missionRepository.success(userId, missionId);
  return usermission;
}