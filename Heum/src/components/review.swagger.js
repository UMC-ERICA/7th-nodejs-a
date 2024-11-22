import { error2response, page2response } from "./functions.swagger.js";

const reviewRequest = {
    required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              account_xid: { type: "number" },
              restaurant_id: { type: "number" },
              title: { type: "string" },
              body: { type: "string", nullable: true },
              rating: { type: "number" }
            }
          }
        }
      }
}

export const reviewItem = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        content: { type: 'string' },
        score: { type: 'integer' },
        create_at: { type: 'string', format: 'date' }
    }
 }
// handleMyStoreReciew
const review_200 = page2response("나의 리뷰 조회 성공", reviewItem);
const review_404_user = error2response("NotFoundUserError", "해당하는 유저를 찾을 수 없습니다.", "U021");
const review_404_store = error2response("NotFoundStoreError", "해당하는 가게를 찾을 수 없습니다.", "U022");
const review_500 = error2response("undefinedReviewError", "가게의 리뷰 조회 과정에서 오류가 발생했습니다.", "U013");

export const reviewPostItem = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        account_xid: { type: 'integer' },
        restaurant_id: { type: 'integer' },
        title: { type: 'string' },
        content: { type: 'string' },
        score: { type: 'integer' },
        create_at: { type: 'string', format: 'date' }
    }
}

//handleReviewPost
const reviewPost_200 = page2response("리뷰 작성 성공", reviewPostItem);
const reviewPost_404 = error2response("NotFoundStoreError", "해당하는 가게를 찾을 수 없습니다.", "U022");
const reviewPost_409 = error2response("DuplicateReviewError", "해당 가게에 이미 리뷰를 작성하셨습니다.", "U003");
const reviewPost_500 = error2response("undefinedReviewError", "리뷰 작성 과정에서 오류가 발생했습니다.", "U013");

export const reviewSchemas = {
    reviewRequest,
    review_200,
    review_404_user,
    review_404_store,
    review_500,
    reviewPost_200,
    reviewPost_404,
    reviewPost_409,
    reviewPost_500
}
