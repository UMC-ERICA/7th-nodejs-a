//repositories
import { getRes } from "../repositories/restaurant.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { addMission, getMission, addTryMission, getTryMission, 
    getStoreMissions, getTryingMyMissions, getMissionList, changeMissionList} from "../repositories/mission.repository.js";
import * as er from '../error.js';
import { responseFromMissions } from '../dtos/mission.dto.js';

export const makeMission = async (data) => {
  try {
    const findResId = await getRes(data.restaurant_id);
    if (findResId === null) {
      throw new er.NotFoundStoreError("가게가 존재하지 않아 미션을 생성할 수 없습니다.", data, 404);
    }
    const joinMissionId = await addMission({
      title: data.title,
      content: data.content,
      point: data.point,
      restaurant_id: data.restaurant_id,
      deadline: data.deadline
    });
    const mission = await getMission(joinMissionId);
    return mission;
  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedMissionError("미션 추가 중 오류가 발생했습니다.", data, 500);
  }
};

export const addTryingMission = async (data) => {
  try {
    const getUserId = await getUser(data.account_xid);
    const getMissionId = await getMission(data.mission_id);

    if (getUserId === null) {
      throw new er.NotFoundUserError("계정을 찾을 수 없습니다.", data, 404);
    } else if (getMissionId === null) {
      throw new er.NotFoundMissionError("미션을 찾을 수 없습니다.", data, 404);
    }

    const joinTryMission = await addTryMission({
      account_xid: data.account_xid,
      mission_id: data.mission_id,
      state: data.state,
      create_at: data.create_at
    });
    const mission = await getTryMission(joinTryMission);
    return mission;

  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedMissionListError("미션 도전하기 처리중 오류가 발생했습니다.", data, 500);
  }
};

export const listStoreMissions = async (storeId, cursor) => {
  try {
    const getStoreId = await getRes(storeId);
    if (getStoreId === null) {
      throw new er.NotFoundStoreError("가게를 찾을 수 없습니다.", { restaurant_id: storeId, cursor: cursor }, 404);
    }
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(missions);
  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedMissionError("가게의 미션 조회 과정에서 오류가 발생했습니다", { restaurant_id: storeId, cursor: cursor }, 500);
  }
};

export const listTryingMyMissions = async (userId, state, cursor) => {
  try {
    const missions = await getTryingMyMissions(userId, state, cursor);
    return responseFromMissions(missions);
  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedMissionListError(
      `나의 ${state} 미션 조회 과정에서 오류가 발생했습니다.`,
      { account_xid: userId, state: state, cursor: cursor },
      500
    );
  }
};

export const changeMissionState = async (userId, missionId, state) => {
  try {
    const getMissionId = await getMissionList(userId, missionId);
    if (!getMissionId) {
      throw new er.NotFoundMissionListError('해당 미션을 찾을 수 없습니다', { account_xid: userId, mission_id: missionId, state: state }, 404);
    }
    const result = changeMissionList(getMissionId, state);
    return result;
  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedMissionListError('미션 상태 변경 과정에서 오류가 발생했습니다.', { account_xid: userId, mission_id: missionId, state: state }, 500);
  }
};