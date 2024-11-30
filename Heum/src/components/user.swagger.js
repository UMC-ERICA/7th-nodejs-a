import e from "express";
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
              email: { type: "string" },
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

export const updateUserRequest = {
    required: true,
    content: {
        "application/json": {
            schema: {
                type: "object",
                properties: {
                    nickname: { type: "string", nullable: true },
                    name: { type: "string", nullable: true },
                    email: { type: "string", nullable: true },
                    phone: { type: "string", nullable: true },
                    birth: { type: "string", format: "date", nullable: true },
                    address: { type: "string", nullable: true },
                    state: { type: "string", nullable: true },
                    delete_at: { type: "string", format: "date", nullable: true },
                    point: { type: "integer", nullable: true },
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
        email: { type: "string" },
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

export const updateItem = {
  type: "object",
  properties: {
    xid: { type: "integer" },
    data: {
      type: "object",
      properties: {
        id: { type: "integer" },
        nickname: { type: "string", nullable: true },
        name: { type: "string", nullable: true },
        email: { type: "string", nullable: true },
        phone: { type: "string", nullable: true },
        birth: { type: "string", format: "date", nullable: true },
        address: { type: "string", nullable: true },
        state: { type: "string", nullable: true },
        delete_at: { type: "string", format: "date", nullable: true },
        point: { type: "integer", nullable: true },
        food: { type: "string", nullable: true },
        create_at: { type: "string", format: "date" }
      }
    }
  }
}

const user_200 = item2response("회원가입 성공 응답", userItem);
const user_404 = error2response("DuplicateUserPhoneError", "이미 등록된 전화번호입니다.", "U001");
const user_500 = error2response("undefinedUserError", "회원가입 중 오류가 발생했습니다.", "U011");

const update_200 = item2response("정보수정 성공 응답", updateItem);
const update_404 = error2response("NotFoundUserError", "정보수정 중 오류가 발생했습니다.", "U021");
const update_500 = error2response("undefinedUserError", "회원가입 중 오류가 발생했습니다.", "U011");

export const userSchemas = {
    userRequest,
    user_200,
    user_404,
    user_500,
    updateUserRequest,
    update_200,
    update_404,
    update_500
}
