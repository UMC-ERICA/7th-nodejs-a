import { StatusCodes } from "http-status-codes";
import { bodyToRestuarnt } from "../dtos/restaurant.dto.js";
import { createRestaurant } from "../services/restaurant.service.js";
import { findMissionOfRestaurant } from '../services/restaurant.service.js'

export const newRestaurant = async (req, res, next) => {
  /*
    #swagger.summary = '식당 추가 API';
    #swagger.operationId = 'newRestaurant';

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              restaurant_name: { 
                type: "string" 
              },
              address: { 
                type: "string", 
                description: "식당 주소" 
              },
              type: { 
                type: "string", 
                description: "취급 음식 종류 (한식, 양식 등)" 
              },
              phone_number: { 
                type: "string", 
                description: "식당 전화번호" 
              }
            },
            required: ["restaurant_name", "address", "type", "phone_number"]
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "식당 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS", 
                description: "API 호출 결과 상태"
              },
              error: { 
                type: "object"
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    restaurant_name: { 
                      type: "string"
                    },
                    address: { 
                      type: "string"
                    },
                    type: { 
                      type: "string", 
                      description: "식당 종류"
                    },
                    phone_number: { 
                      type: "string", 
                      description: "식당 전화번호"
                    },
                    success: { 
                      type: "boolean"
                    }
                  }
                },
                description: "추가된 식당 정보"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "식당 추가 실패",
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
    const restaurant = await createRestaurant(bodyToRestuarnt(req.body));
    if(restaurant.success){
      res.status(StatusCodes.OK).success(restaurant);
    }
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

export const readmissionOfRestaurant = async (req, res, next) => {
  /*
    #swagger.summary = '특정 식당에 걸린 미션 조회 API';
    #swagger.operationId = 'readmissionOfRestaurant';

    #swagger.parameters = [
      {
        in: 'path',
        name: 'restaurant_id',
        required: true,
        description: '식당 ID',
        schema: {
          type: 'string'
        }
      }
    ];

    #swagger.responses[200] = {
      description: "식당에 걸린 미션 조회 성공",
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
                    id: { 
                      type: "string", 
                      description: "미션 ID"
                    },
                    Restaurant_id: { 
                      type: "string", 
                      description: "식당 ID"
                    },
                    mission_name: { 
                      type: "string", 
                      description: "미션 이름"
                    },
                    deadline: { 
                      type: "string", 
                      format: "date-time", 
                      description: "미션 기한"
                    },
                    created_date: { 
                      type: "string", 
                      format: "date-time", 
                      description: "미션 생성 일시"
                    },
                    updated_date: { 
                      type: "string", 
                      format: "date-time", 
                      description: "미션 수정 일시"
                    },
                    count: { 
                      type: "integer"
                    },
                    mission_point: { 
                      type: "integer", 
                      description: "미션 완료 시 받을 포인트"
                    }
                  }
                },
                description: "조회된 미션 목록"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
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
  const restaurantId = req.params.restaurant_id;
  try{
    const missionOfRestaurant = await findMissionOfRestaurant(restaurantId);  
  
    if (missionOfRestaurant.success) {
      const response = JSON.parse(
        JSON.stringify(missionOfRestaurant.data, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value))
      res.status(StatusCodes.OK).success(response);  
    }
    else {
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
}