import { responseFromMyTryingMission } from "../dtos/user.dto.js";
import { getMission } from "../repositories/mission.repository.js";
import { 
  getAccount,
  addMyTryingMisson,
  getMyTryingMission
} from "../repositories/user.repository.js";

export const createMyTryingMission = async (data) => {
    const account_id = await getAccount(data.account_id);
    const mission_id = await getMission(data.mission_id);

    if(!account_id)
      throw new Error("계정을 찾을 수 없습니다.");
    else if(!mission_id)
      throw new Error("미션을 찾을 수 없습니다.");
    else{
      const joinMyTryingMission = await addMyTryingMisson({
          account_id: data.account_id,
          mission_id: data.mission_id,
          state: data.state,
      });
      if (joinMyTryingMission === null) {
          throw new Error("이미 진행중인 미션입니다.");
      }
      console.log(joinMyTryingMission);
      const myTryingMission = await getMyTryingMission(joinMyTryingMission);
      return responseFromMyTryingMission(myTryingMission);
  }
};