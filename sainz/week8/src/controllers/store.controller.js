import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/store.dto.js';
import { addnewstore } from '../services/store.service.js';
import { listStoreReviews } from '../services/store.service.js';
import { Readmission } from '../services/mission.service.js';

export const handleAddstore = async (req, res, next) => {
  console.log('상점 추가');
  console.log('body:', req.body);

  const store = await addnewstore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

//week7 mission
export const handleStoreMission = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 조회 API';
    #swagger.responses[200] = {
      description: "상점 미션 조회 성공 응답",
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
                        mission_id: { type: "number" },
                        store_id:{type:"number"},
                        points: { type: "number" },
                        deadline: {type : "string",format:"date"},
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
  description: "상점에 미션이 없을 경우 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "U004" },
              reason: { type: "string", example: "상점에 미션이 존재하지 않습니다." },
              data: { type: "object", nullable: true }
            }
          },
          success: { type: "object", nullable: true, example: null }
        }
      }
    }
  }
};

#swagger.responses[404] = {
  description: "상점이 없을 경우 실패 응답",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          resultType: { type: "string", example: "FAIL" },
          error: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "U002" },
              reason: { type: "string", example: "상점이 존재하지 않습니다." },
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
    const storeId = req.params.storeId;
    const Storemission = await Readmission(storeId);

    if (Storemission.success) {
      res.status(StatusCodes.OK).success(Storemission);
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
