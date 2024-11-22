import { error2response, page2response } from "./functions.swagger.js";

export const missionRequest = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            point: { type: "number" },
            restaurant_id: { type: "number", nullable: true },
            deadline: { type: "string", format: "date", nullable: true }
          }
        }
      }
    }
}

export const missionItem = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        content: { type: 'string' },
        point: { type: 'integer' },
        restaurant_id: { type: 'string' },
        deadline: { type: 'string', format: 'date' }
    }
}
//handleStoreMissionList
const mission_200 = page2response("미션 조회 성공", missionItem);
const mission_404 = error2response("NotFoundStoreError", "가게를 찾을 수 없습니다.", "U022");
const mission_500 = error2response("undefinedMissionError", "미션 조회 과정에서 오류가 발생했습니다.", "U014");

//handleMissionAdd
const missionAdd_201 = page2response("미션 생성 성공", missionItem);
const missionAdd_404 = error2response("NotFoundStoreError", "가게가 존재하지 않아 미션을 생성할 수 없습니다.", "U022");
const missionAdd_500 = error2response("undefinedMissionError", "미션 추가 중 오류가 발생했습니다.", "U014");


export const missionSchemas = {
        missionRequest,
        mission_200,
        mission_404,
        mission_500,
        missionAdd_201,
        missionAdd_404,
        missionAdd_500
    } 