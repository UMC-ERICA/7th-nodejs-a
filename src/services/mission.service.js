import * as reviewRepository from "../repositories/review.repository.js";
import * as missionRepository from "../repositories/mission.repository.js";

export const addMissionToStore = async (storeId, missionData) => {
  // 가게 존재 여부 확인
  const store = await reviewRepository.findStoreById(storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다."); // 가게가 없을 경우 에러 발생
  }

  // 미션 추가
  const missionId = await missionRepository.createMission(storeId, missionData);
  return missionId; // 추가된 미션의 ID 반환
};