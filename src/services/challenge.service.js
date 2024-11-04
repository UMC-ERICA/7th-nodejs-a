import * as missionRepository from "../repositories/missionRepository.js";
import * as challengeRepository from "../repositories/challengeRepository.js";

export const challengeMission = async (userId, missionId) => {
  // 미션 존재 여부 확인
  const mission = await missionRepository.findMissionById(missionId);
  if (!mission) {
    throw new Error("해당 미션이 존재하지 않습니다.");
  }

  // 이미 도전 중인지 확인
  const existingChallenge = await challengeRepository.findChallengeByUserAndMission(userId, missionId);
  if (existingChallenge) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 도전 생성
  const challengeId = await challengeRepository.createChallenge(userId, missionId);
  return challengeId;
};