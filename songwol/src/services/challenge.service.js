import * as missionRepository from "../repositories/mission.repository.js";
import * as challengeRepository from "../repositories/challenge.repository.js";

export const challengeMission = async (userId, missionId) => {
  // 미션 존재 여부 확인
  const mission = await missionRepository.findMissionById(missionId);
  if (!mission) {
    throw new Error("해당 미션이 존재하지 않습니다.");
  }

  // 이미 도전 중인지 확인
  const existingChallenge = await challengeRepository.findChallengeByUserAndMission(userId, missionId);
  if (existingChallenge) {
    return { message: "이미 도전 중인 미션입니다." };
  }

  // 도전 생성
  const challengeId = await challengeRepository.createChallenge(userId, missionId);
  return challengeId;
};


export const userMissionList = async (userId) => {
  const missionList = await challengeRepository.showUserMission(userId);
  return { ...missionList }
}

export const userMissionSuccess = async (userId, missionId) => {
  const usermission = await challengeRepository.success(userId, missionId);
  return { ...usermission }
}