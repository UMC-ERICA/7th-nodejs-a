import * as missionService from '../services/mission.service.js'; // 서비스 모듈 임포트
import { MissionDTO } from '../dtos/mission.dto.js'; // DTO 임포트

export const addMissionToStore = async (req, res, next) => {
  try {
    const storeId = req.params.storeId; // URL 파라미터에서 storeId 추출
    const missionData = new MissionDTO(req.body); // 요청 본문에서 미션 데이터 생성

    // 서비스 호출하여 미션 추가
    const newMissionId = await missionService.addMissionToStore(storeId, missionData);
    
    // 성공 응답 반환
    res.status(201).json({ message: "미션이 추가되었습니다.", data: newMissionId });
  } catch (error) {
    next(error); // 에러 처리 미들웨어로 전달
  }
};