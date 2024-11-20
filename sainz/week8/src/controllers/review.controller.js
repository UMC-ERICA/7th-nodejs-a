import { StatusCodes } from 'http-status-codes';
import { bodyToReview } from '../dtos/review.dto.js';
import { addnewreview } from '../services/review.service.js';
import { listStoreReviews } from '../services/store.service.js';
import { ReadReviews } from '../services/user.service.js';

export const handleAddReview = async (req, res, next) => {
  console.log('리뷰 추가');
  console.log('body:', req.body);

  const review = await addnewreview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};
export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U003" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */

  const reviews = await listStoreReviews(req.params.storeId);
  res.status(StatusCodes.OK).success(reviews);
};
export const handleMyReviewList = async (req, res, next) => {
  /*
    #swagger.summary = '유저가 작성한 리뷰 조회 API';
    #swagger.responses[200] = {
      description: "작성한 리뷰 조회 성공 응답",
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
                        review_id: { type: "number" },
                        title: { type: "string" },
                        content: {type : "string"},
                        rating: { type: "number" }
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
      description: "작성한 리뷰 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U003" },
                  reason: { type: "string",example:"작성한 리뷰가 없거나 유저의 정보가 잘못되었습니다" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  const userId = req.params.userId;
  try {
    const reviewResult = await ReadReviews(userId);

    if (reviewResult.success) {
      res.status(StatusCodes.OK).success(reviewResult);
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
