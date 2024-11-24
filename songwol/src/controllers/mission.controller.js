import * as missionService from '../services/mission.service.js';
import { MissionDTO } from '../dtos/mission.dto.js';
import { ChallengeDTO } from '../dtos/challenge.dto.js';

// 가게에 미션 추가
export const addMissionToStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missionData = new MissionDTO(req.body);

    const newMissionId = await missionService.addMissionToStore(storeId, missionData);
    
    res.status(201);
    res.success({ message: "미션이 추가되었습니다.", data: newMissionId });
  } catch (error) {
    next(error);
  }
};

// 가게별 미션 조회
export const getStoreMission = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);

    const missions = await missionService.storeMissionList(storeId);

    res.status(200);
    res.success({ storeId: storeId, missions });
  } catch (error) {
    next(error);
  }
};

// 유저에 미션 추가
export const challengeMission = async (req, res, next) => {
  try {
    const missionId = parseInt(req.params.missionId, 10);
    const { userId } = req.body;

    const challengeData = new ChallengeDTO({ userId, missionId });

    const newChallengeId = await missionService.challengeMission(challengeData);

    res.status(201);
    res.success({ message: "미션 도전 추가에 성공했습니다.", challengeId: newChallengeId });
  } catch (error) {
    next(error);
  }
};

// 유저별 미션 조회
export const getUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const missions = await missionService.userMissionList(userId);

    res.status(200);
    red.success({ userId: userId, missions });
  } catch (error) {
    next(error);
  }
};

// 미션 성공 처리
export const successMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    const missions = await missionService.userMissionSuccess(userId, missionId);

    res.status(200);
    res.success({ message: "미션 완료 처리에 성공했습니다.", missions });
  } catch (error) {
    next(error);
  }
};