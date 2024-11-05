import * as missionService from '../services/mission.service.js';
import { MissionDTO } from '../dtos/mission.dto.js';

export const addMissionToStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missionData = new MissionDTO(req.body);

    // 서비스 호출하여 미션 추가
    const newMissionId = await missionService.addMissionToStore(storeId, missionData);
    
    // 성공 응답 반환
    res.status(201).json({ message: "미션이 추가되었습니다.", data: newMissionId });
  } catch (error) {
    next(error);
  }
};

export const getStoreMission = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missions = await missionService.storeMissionList(storeId);
    res.status(201).json({ storeId: storeId, missions });
  } catch (error) {
    next(error);
  }
}