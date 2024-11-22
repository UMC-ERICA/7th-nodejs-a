import { error2response, page2response, item2response } from "./functions.swagger.js";

export const missionListRequest = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            account_xid: { type: "integer" },
            mission_id: { type: "integer" },
            state: { type: "string", nullable: true, enum: ["trying", "clear", "failed"] },
          }
        }
      }
    }
}

export const missionListItem = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        account_xid : { type: 'integer' },
        mission_id : { type: 'integer' },
        state : { type: 'string' },
        create_at : { type: 'string', format: 'date' }
    }
}
//handleTringMyMissionList
const missionList_200 = page2response("도전중인 미션 조회 성공", missionListItem);
const missionList_500 = error2response("undefinedMissionListError", "나의 ${state} 미션 조회 과정에서 오류가 발생했습니다.", "U015");

//handleMissionSuccess
const changeState_200 = item2response("미션 상태 변경 성공", missionListItem);
const changeState_404 = error2response("NotFoundMissionListError", '해당 미션을 찾을 수 없습니다', "U025");
const changeState_500 = error2response("undefinedMissionListError", "미션 상태 변경 과정에서 오류가 발생했습니다", "U015");

//handleUserMissionAdd
const missionListAdd_200 = page2response("미션리스트 추가 성공 응답", missionListItem);
const missionListAdd_404_1 = error2response("NotFoundUserError", "계정을 찾을 수 없습니다.", "U021");
const missionListAdd_404_2 = error2response("NotFoundMissionError", "미션을 찾을 수 없습니다.", "U024");
const missionListAdd_500 = error2response("undefinedMissionListError", "미션리스트 추가 과정에서 오류가 발생했습니다.", "U015");

export const missionListSchemas = {
    missionListRequest,
    missionList_200,
    missionList_500,
    changeState_200,
    changeState_404,
    changeState_500,
    missionListAdd_200,
    missionListAdd_404_1,
    missionListAdd_404_2,
    missionListAdd_500
}


