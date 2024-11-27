import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { bodyToMyTryingMission } from "../dtos/user.dto.js";
import { createMyTryingMission, updateMyMissionStatus, updateUserInfor } from "../services/user.service.js";
import { createReview } from "../services/review.service.js";
import { readReviews} from "../services/user.service.js";
import { findMyTryingMissions } from '../services/user.service.js';

export const newReview = async (req, res, next) => {
   /*
    #swagger.summary = '리뷰 생성';
    #swagger.operationId = 'newReview';

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              restaurant_id: { 
                type: "string"
              },
              score: { 
                type: "integer", 
                description: "리뷰 점수 (1~5)" 
              },
              content: { 
                type: "string", 
                description: "리뷰 내용" 
              },
              created_date: { 
                type: "string", 
                format: "date-time", 
                description: "리뷰 생성 날짜" 
              }
            },
            required: ["restaurant_id", "score", "content"]
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "리뷰 생성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS" 
              },
              error: { 
                type: "object", 
                example: null 
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    restaurant_id: { 
                      type: "string"
                    },
                    score: { 
                      type: "integer"
                    },
                    content: { 
                      type: "string"
                    },
                    created_date: { 
                      type: "string", 
                      format: "date-time" 
                    },
                    success: { 
                      type: "boolean"
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "리뷰 생성 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL" 
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    example: "R101" 
                  },
                  reason: { 
                    type: "string"
                  },
                  data: { 
                    type: "object" 
                  }
                }
              },
              success: { 
                type: "array"
              }
            }
          }
        }
      }
    };
  */
    try {
      const review = await createReview(bodyToReview(req.body));
      if (review.success)
          res.status(StatusCodes.OK).success(review);
      else{
          res.status(404).error({
              errorCode: err.errorCode,
              reason: err.message,
              data: err.data
          });
      }
    } catch(error){
      next(error);
    }
};

export const newMyTryingMission = async (req, res, next) => {
  /*
    #swagger.summary = '내가 도전중인 미션으로 추가하는 API';
    #swagger.operationId = 'newMyTryingMission';

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              account_id: { 
                type: "string"
              },
              mission_id: { 
                type: "string" 
              }
            },
            required: ["account_id", "mission_id"]
          }
        }
      }
    };

    #swagger.responses[200] = {
      description: "내가 도전중인 미션 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS" 
              },
              error: { 
                type: "object", 
                example: null 
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    account_id: { 
                      type: "string"
                    },
                    mission_id: { 
                      type: "string" 
                    },
                    success: { 
                      type: "string" 
                    },
                    success_boolean: { 
                      type: "boolean"
                    }
                  }
                }
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "미션 추가 실패",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL" 
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string", 
                    example: "M010" 
                  },
                  reason: { 
                    type: "string" 
                  },
                  data: { 
                    type: "object" 
                  }
                }
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
    const mission = await createMyTryingMission(bodyToMyTryingMission(req.body));
    if (mission.success_boolean){
      res.status(StatusCodes.OK).success(mission);
    }
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  } catch(error) {
    next(error);
  }
};

export const readMyReviewList = async (req, res, next) => {
  /*
    #swagger.summary = '유저 리뷰 목록 조회 API';
    #swagger.operationId = 'readMyReviewList';

    #swagger.parameters = [
      {
        in: 'path',
        name: 'user_id',
        required: true,
        description: '유저 ID',
        schema: {
          type: 'string',
        }
      }
    ];

    #swagger.responses[200] = {
      description: "내 리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS", 
              },
              error: { 
                type: "object", 
                example: null
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { 
                      type: "string", 
                      description: "리뷰 ID"
                    },
                    Restaurant_id: { 
                      type: "string"
                    },
                    Account_id: { 
                      type: "string"
                    },
                    score: { 
                      type: "integer"
                    },
                    picture: { 
                      type: "string", 
                      description: "리뷰와 관련된 사진 URL (없을 경우 null)"
                    },
                    content: { 
                      type: "string", 
                      description: "리뷰 내용"
                    },
                    created_date: { 
                      type: "string", 
                      format: "date-time", 
                      description: "리뷰 작성일"
                    },
                    updated_date: { 
                      type: "string", 
                      format: "date-time", 
                      description: "리뷰 수정일 (수정되지 않은 경우 null)"
                    }
                  }
                },
                description: "조회된 리뷰 목록"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "리뷰를 찾을 수 없는 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL", 
                description: "API 호출 실패 상태"
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string",  
                    description: "에러 코드"
                  },
                  reason: { 
                    type: "string", 
                    example: "not found review", 
                    description: "에러 이유"
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
    const userId = req.params.user_id;
    
    try {
      const result = await readReviews(userId);
      if (result.success){
        const response = JSON.parse(  //Bigint return 문제 해결위한 코드
          JSON.stringify(result.data, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value)
        );
        res.status(StatusCodes.OK).success(response);
      }
      else{
        res.status(404).error({
            errorCode: err.errorCode,
            reason: err.message,
            data: err.data
        });
    }
  } catch(error){
    next(error);
  }
};

export const readMyTryingMissions = async (req, res, next) => {
  /*
    #swagger.summary = '유저가 진행 중인 미션 목록 조회 API';
    #swagger.operationId = 'readMyTryingMissions';

    #swagger.parameters = [
      {
        in: 'path',
        name: 'user_id',
        required: true,
        description: '유저 ID',
        schema: {
          type: 'string'
        }
      }
    ];

    #swagger.responses[200] = {
      description: "사용자가 도전 중인 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "SUCCESS"
              },
              error: { 
                type: "object", 
                example: null,
                description: "에러 정보, 성공 시 null"
              },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    Account_id: { 
                      type: "string", 
                      description: "유저 ID"
                    },
                    Mission_id: { 
                      type: "string", 
                      description: "미션(진행중인) ID"
                    },
                    success: { 
                      type: "string"
                    }
                  }
                },
                description: "조회된 진행 중인 미션 목록"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "진행 중인 미션이 없는 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL", 
                description: "API 호출 실패 상태"
              },
              error: {
                type: "object",
                properties: {
                  errorCode: { 
                    type: "string",  
                    description: "에러 코드"
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
    const userId = req.params.user_id; 
    try{
      const result = await findMyTryingMissions(userId);

      if (result.success) {
        const response = JSON.parse(
          JSON.stringify(result.data, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value)
        )
        res.status(StatusCodes.OK).success(response);
      } 
      else{
        res.status(404).error({
          errorCode: err.errorCode,
          reason: err.message,
          data: err.data
        });
      }
    }
    catch(error) {
      next(error);
    }
};

export const updateMyTryingMissions = async (req, res, next) => {
  /*
    #swagger.summary = '도전 중인 미션 -> 완료로 변경 API';
    #swagger.operationId = 'updateMyTryingMissions';

    #swagger.parameters = [
      {
        in: 'path',
        name: 'user_id',
        required: true,
        description: '유저 ID',
        schema: {
          type: 'string'
        }
      },
      {
        in: 'path',
        name: 'mission_id',
        required: true,
        description: '미션 ID',
        schema: {
          type: 'string'
        }
      }
    ];

    #swagger.responses[200] = {
      description: "미션 상태를 'succeed'로 변경 성공",
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
                    Account_id: { 
                      type: "string", 
                      description: "유저 ID"
                    },
                    Mission_id: { 
                      type: "string", 
                      description: "미션 ID"
                    },
                    success: { 
                      type: "string", 
                      example: "succeed"
                    }
                  }
                },
                description: "완료된 미션 상태 정보"
              }
            }
          }
        }
      }
    };

    #swagger.responses[404] = {
      description: "진행 중인 미션을 찾을 수 없는 경우",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { 
                type: "string", 
                example: "FAIL", 
                description: "API 호출 실패 상태"
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
  const user_id = req.params.user_id;
  const mission_id = req.params.mission_id;
  try{
    const updatedMission = await updateMyMissionStatus(user_id, mission_id);

    if (updatedMission.success){
      const response = JSON.parse(
        JSON.stringify(updatedMission.data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value)
      )
      res.status(StatusCodes.OK).success(response);
    }
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  }
  catch(error) {
    next(error);
  }
}

export const updateUserInfo = async (req, res, next) => {
  try{
    const updatedInfo = await updateUserInfor(req.body);

    if (updatedInfo.success){
      const response = JSON.parse(
        JSON.stringify(updatedInfo.data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value)
      )
      res.status(StatusCodes.OK).success(response);
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
}