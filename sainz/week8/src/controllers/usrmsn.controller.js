import { StatusCodes } from 'http-status-codes';
import { bodyToUserMission } from '../dtos/usrmsn.dto.js';
import { AddUserMission } from '../services/usrmsn.service.js';
//week6
import { ReadMyMission } from '../services/usrmsn.service.js';
import { UpdateMyMission } from '../services/usrmsn.service.js';

export const handleAddUserMission = async (req, res, next) => {
  console.log('진행중에 미션 추가');
  console.log('body:', req.body);

  const usrmsn = await AddUserMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: usrmsn });
};
//week7
export const handleMyMission = async (req, res, next) => {
  /*
    #swagger.summary = '유저 미션 조회 API';
    #swagger.responses[200] = {
      description: "유저 미션 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        user_mission_id: { type: "number" },
                        user_id:{type:"number"},
                        mission_id: { type: "number" },
                        status: {type : "string"},
                      }
                    }
                  },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
  description: "유저의 미션이 없거나 잘못된 유저 조회시 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "U003", description:"유저가 진행중인 미션이 존재하지 않을겅우 U003,해당 유저가 존재하지 않을경우 U002"},
              reason: { type: "string", example: "유저가 진행중인 미션이 존재하지 않거나 해당 유저가 존재하지 않습니다"},
              data: { type: "object", nullable: true }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }   
      }
    }
  }
};
  */
  try {
    const userId = req.params.userId;
    const MyMission = await ReadMyMission(userId);

    if (MyMission.success) {
      res.status(StatusCodes.OK).success(MyMission);
    } else {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: error.errorCode,
        reason: error.message,
        data: userId,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const handleUpdateStatus = async (req, res, next) => {
  /*
    #swagger.summary = '미션 상태 변경 API';
    #swagger.responses[200] = {
      description: "미션 상태 변경 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        user_mission_id: { type: "number" },
                        user_id:{type:"number"},
                        mission_id: { type: "number" },
                        status: {type : "string"}
                      }
                    }
                  },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
  description: "진행 중인 미션 조회없을때 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "U006"},
              reason: { type: "string", example: "진행 중인 미션이 없음"},
              data: { type: "object", nullable: true }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }   
      }
    }
  }
};
  */
  try {
    const userId = req.params.userId;
    const missionId = req.params.missionId;
    const MissionStatus = await UpdateMyMission(userId, missionId);

    if (MissionStatus.success) {
      res.status(StatusCodes.OK).success(MissionStatus);
    } else {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: error.errorCode,
        reason: error.message,
        data: userId,
      });
    }
  } catch (error) {
    next(error);
  }
};
