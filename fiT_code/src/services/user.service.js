import { responseFromMyTryingMission } from "../dtos/user.dto.js";
import * as error from "../error.js";
import { getMission } from "../repositories/mission.repository.js";
import { 
  getAccount,
  addMyTryingMisson,
  getMyTryingMission,
  getMyReviews,
  getTryingMissionBykey,
} from "../repositories/user.repository.js";

//내가 하고 있는 미션 생성
export const createMyTryingMission = async (data) => {
  try{
    const account_id = await getAccount(data.account_id);
    const mission_id = await getMission(data.mission_id);

    if(!account_id)
      throw new error.NotFoundAccount("not found account", null);
    else if(!mission_id)
      throw new error.NotFoundMission("not found mission", null);
    else{
      const joinMyTryingMission = await addMyTryingMisson({
          account_id: data.account_id,
          mission_id: data.mission_id,
          success: data.success
      });

      if (!joinMyTryingMission) {
          throw new error.alreadyOngoingMission("alreay ongoing mission", null);
      }

      const MyTryingMission = await getTryingMissionBykey(joinMyTryingMission.account_id, joinMyTryingMission.mission_id.toString());
      return responseFromMyTryingMission(MyTryingMission);
    }
  }
  catch(error){
    console.error("error at createMyTryingMissions", null);
    throw error;
  }
}

//아이디를 받아 해당 리뷰들 읽어오기
export const readReviews = async (userId) => {
  try {
    const reviewlist = await getMyReviews(userId);

    if (reviewlist.length === 0) {
      throw new error.ReviewNotFoundError("not found review", null);
    }

    return {
      success: true,
      data: reviewlist,
    };
  } 
  catch (error) {
    console.error("error at readReviews", null);
    throw error;
  }
};

//내 도전중인 미션 조회
export const findMyTryingMissions = async (userId) => {
  try {
    const missions = await getMyTryingMission(userId);  

    if (missions.length === 0) {
      throw new error.NotOngoingMission("not ongoing missions", null)
    }

    return { success: true, data: missions };
  } 
  catch (error) {
    console.error("error at findMyTryingMissions", null);
    throw error;
  }
};