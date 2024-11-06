//repositories
import { getRes } from "../repositories/restaurant.repository.js";
import { getUser } from "../repositories/user.repository.js";
import { addMission, getMission, addTryMisson, getTryMission, 
    getStoreMissions, getTryingMyMissions, getChangedMission} from "../repositories/mission.repository.js";
import {responseFromMissions} from '../dtos/mission.dto.js';

  export const makeMission = async (data) =>{
      const findResId = await getRes(data.restaurant_id)
      if(findResId === null){
          throw new Error("가게가 존재하지 않아 미션을 생성할 수 없습니다.");
      }else{
          const joinMissionId = await addMission({
              title: data.title,
              content: data.content,
              point: data.point,
              restaurant_id: data.restaurant_id,
              deadline: data.deadline
          });
          const mission = await getMission(joinMissionId);
          return mission;
      }
  };

  
  
  export const addTryingMission = async (data) =>{
      const getUserId = await getUser(data.account_xid);
      const getMissionId = await getMission(data.mission_id);
      
      if(getUserId === null){
          throw new Error("계정을 찾을 수 없습니다.");
      }else if(getMissionId === null){
          throw new Error("미션을 찾을 수 없습니다.");
      }else{
          const joinTryMission = await addTryMisson({
              account_xid: data.account_xid,
              mission_id: data.mission_id,
              state: data.state,
              create_at: data.create_at
          });
          if (joinTryMission === null) {
              throw new Error(data+"이미 존재하는 미션목록입니다.");
          }
          console.log(joinTryMission);
          const mission = await getTryMission(joinTryMission);
          return mission;
      }
  };
  
  export const listStoreMissions = async (storeId, cursor) =>{
    console.log("listMysStoreReview: ", storeId, cursor);
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(missions);
  };

  export const listTryingMyMissions = async (userId, state, cursor) =>{
    console.log("listTryingMyMissions: ", userId, cursor);
    const missions = await getTryingMyMissions(userId, state, cursor);
    return responseFromMissions(missions);
  };

  export const changeMissionState = async (userId, missionId, state)=>{
    console.log("changeMissionState: ", userId, missionId, state);
    const result = await getChangedMission(userId, missionId, state);
    return result;
  }