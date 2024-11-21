import { item2response, error2response } from "./functions.swagger.js";

export const storeRequest = {
    required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string" },
              phone: { type: "string", nullable: true},
              address: { type: "string" }
            }
          }
        }
      }
} 

export const storeItem = {
    type: "object",
    properties: {
        id: { type: "integer" },
        name: { type: "string" },
        address: { type: "string" },
        phone: { type: "string" },
        create_at: { type: "string", format: "date" }
    } 
}

const store_200 = item2response("가게 추가 성공 응답", storeItem);
const store_404 = error2response("DuplicateStoreError", "이미 존재하는 가게입니다", "U002");
const store_500 = error2response("undefinedStoreError", "가게 추가 중 오류가 발생했습니다.", "U012");

export const storeSchemas = {
    storeRequest,
    store_200,
    store_404,
    store_500
}