import * as missionService from '../services/mission.service.js';
import { MissionDTO } from '../dtos/mission.dto.js';
import { ChallengeDTO } from '../dtos/challenge.dto.js';

// 가게에 미션 추가
export const addMissionToStore = async (req, res, next) => {
    /*
    #swagger.summary = '가게에 미션 추가';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '가게 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              reward: { type: "string" },
              duration: { type: "number" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션이 추가되었습니다." },
              data: { type: "integer", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "M001" },
              message: { type: "string", example: "유효하지 않은 데이터" }
            }
          }
        }
      }
    };
  */
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
    /*
    #swagger.summary = '가게별 미션 조회';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '가게 ID',
      schema: { type: 'integer' }
    };
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "integer", example: 1 },
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    description: { type: "string" },
                    reward: { type: "string" },
                    duration: { type: "number" }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[404] = {
      description: "가게를 찾을 수 없음",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "M002" },
              message: { type: "string", example: "가게를 찾을 수 없습니다." }
            }
          }
        }
      }
    };
  */
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
    /*
    #swagger.summary = '유저에 미션 추가';
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      description: '미션 ID',
      schema: { type: 'integer' }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 도전 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션 도전 추가에 성공했습니다." },
              challengeId: { type: "integer", example: 1 }
            }
          }
        }
      }
    };
  */
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
    /*
    #swagger.summary = '유저별 미션 조회';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: '유저 ID',
      schema: { type: 'integer' }
    };
    #swagger.responses[200] = {
      description: "유저별 미션 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer", example: 1 },
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    description: { type: "string" },
                    reward: { type: "string" },
                    status: { type: "string", example: "IN_PROGRESS" }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
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
    /*
    #swagger.summary = '미션 성공 처리';
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: '유저 ID',
      schema: { type: 'integer' }
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      required: true,
      description: '미션 ID',
      schema: { type: 'integer' }
    };
    #swagger.responses[200] = {
      description: "미션 성공 처리 완료",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션 완료 처리에 성공했습니다." },
              missions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "integer" },
                    name: { type: "string" },
                    description: { type: "string" },
                    reward: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    };
  */
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