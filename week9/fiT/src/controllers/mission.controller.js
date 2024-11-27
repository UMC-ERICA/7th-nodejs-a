import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const newMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 생성 API';
    #swagger.operationId = 'newMission';

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              deadline: { 
                type: "string", 
                format: "date-time", 
                description: "미션의 마감 기한"
              },
              mission_point: { 
                type: "integer", 
                description: "미션 성공 시 받을 포인트"
              }
            },
            required: ["deadline", "mission_point"]
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "미션 생성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string"
              },
              error: { 
                type: "object"
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    deadline: { 
                      type: "string", 
                      format: "date-time", 
                      description: "미션의 마감 기한"
                    },
                    created_date: { 
                      type: "string", 
                      format: "date-time", 
                      description: "미션 생성 일시"
                    },
                    mission_point: { 
                      type: "integer", 
                      description: "미션 완료 시 받을 포인트"
                    },
                    success: { 
                      type: "boolean"
                    }
                  }
                },
                description: "생성된 미션 정보"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "미션 생성 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string"
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string"
                  },
                  reason: { 
                    type: "string"
                  },
                  data: { 
                    type: "object"
                  }
                },
                description: "실패한 요청에 대한 에러 정보"
              },
              success: { 
                type: "object"
              }
            }
          }
        }
      }
    };
  */
  try{
    const mission = await createMission(bodyToMission(req.body));
    if(mission.success)
      res.status(StatusCodes.OK).success(mission);
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  }
  catch(error){
    next(error);
  }
};