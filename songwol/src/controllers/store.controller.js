import * as storeService from '../services/store.service.js';
import { ReviewDTO } from '../dtos/review.dto.js';

// 특정 지역에 가게 추가하기
export const addStore = async (req, res, next) => {
  /*
    #swagger.summary = '특정 지역에 가게 추가';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "맛있는 가게" },
              address: { type: "string", example: "서울특별시 중구 을지로" },
              category: { type: "string", example: "한식" },
              phoneNumber: { type: "string", example: "010-1234-5678" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "가게 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "가게가 추가되었습니다." },
              data: { type: "integer", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 추가 실패 - 잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "S001" },
              message: { type: "string", example: "유효하지 않은 데이터입니다." }
            }
          }
        }
      }
    };
  */
  try {
    const storeData = req.body;
    const newStoreId = await storeService.addStoreService(storeData);

    res.status(201);
    res.success({ message: "가게가 추가되었습니다.", data: newStoreId });
  } catch (error) {
    next(error);
  }
};

// 리뷰 추가
export const addReviewToStore = async (req, res, next) => {
  /*
    #swagger.summary = '가게에 리뷰 추가';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '가게 ID',
      schema: { type: 'integer', example: 1 }
    };
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer", example: 2 },
              content: { type: "string", example: "너무 맛있어요!" },
              rating: { type: "integer", example: 5 }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 추가 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "리뷰가 추가되었습니다." },
              data: {
                type: "object",
                properties: {
                  reviewId: { type: "integer", example: 1 },
                  content: { type: "string", example: "너무 맛있어요!" },
                  rating: { type: "integer", example: 5 },
                  userId: { type: "integer", example: 2 },
                  storeId: { type: "integer", example: 1 }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "리뷰 추가 실패 - 잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              errorCode: { type: "string", example: "R001" },
              message: { type: "string", example: "유효하지 않은 리뷰 데이터입니다." }
            }
          }
        }
      }
    };
  */
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const reviewData = new ReviewDTO(req.body);

    const newReview = await storeService.addReviewToStoreService(storeId, reviewData);
    res.status(201);
    res.success({ message: "리뷰가 추가되었습니다.", data: newReview });
  } catch (error) {
    next(error);
  }
};

// 리뷰 조회
export const showReview = async (req, res, next) => {
  /*
    #swagger.summary = '가게 리뷰 목록 조회';
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      description: '가게 ID',
      schema: { type: 'integer', example: 1 }
    };
    #swagger.responses[200] = {
      description: "리뷰 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "integer", example: 1 },
              reviews: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    reviewId: { type: "integer", example: 1 },
                    userId: { type: "integer", example: 2 },
                    content: { type: "string", example: "너무 맛있어요!" },
                    rating: { type: "integer", example: 5 }
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
              errorCode: { type: "string", example: "S002" },
              message: { type: "string", example: "해당 가게를 찾을 수 없습니다." }
            }
          }
        }
      }
    };
  */
  try {
    const storeId = parseInt(req.params.storeId, 10);

    const reviews = await storeService.reviewList(storeId);
    res.status(200);
    res.success({ storeId: storeId, reviews });
  } catch (error) {
    next(error);
  }
};