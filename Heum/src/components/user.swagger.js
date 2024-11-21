import { item2response, error2response } from "./functions.swagger.js";

export const userRequest = {
    required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              nickname: { type: "string" },
              name: { type: "string" },
              phone: { type: "string" },
              birth: { type: "string", format: "date" },
              address: { type: "string" },
              point: { type: "integer", nullable: true},
              food: { type: "string", nullable: true }
            }
          }
        }
      }
}

export const userItem = {
    type: "object",
    properties: {
        id: { type: "integer" },
        nickname: { type: "string" },
        name: { type: "string" },
        phone: { type: "string" },
        birth: { type: "string", format: "date" },
        address: { type: "string" },
        state: { type: "string" },
        delete_at: { type: "string", format: "date", nullable: true },
        point: { type: "integer" },
        food: { type: "string", nullable: true },
        create_at: { type: "string", format: "date" }
    } 
}

const user_200 = item2response("회원가입 성공 응답", userItem);
const user_404 = error2response("DuplicateUserPhoneError", "이미 등록된 전화번호입니다.", "U001");
const user_500 = error2response("undefinedUserError", "회원가입 중 오류가 발생했습니다.", "U011");

export const userSchemas = {
    userRequest,
    user_200,
    user_404,
    user_500
}

