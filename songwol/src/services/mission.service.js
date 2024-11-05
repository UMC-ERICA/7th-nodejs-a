import * as reviewRepository from "../repositories/review.repository.js";
import * as missionRepository from "../repositories/mission.repository.js";

export const addMissionToStore = async (storeId, missionData) => {
  // 가게 존재 여부 확인
  const store = await reviewRepository.findStoreById(storeId);
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