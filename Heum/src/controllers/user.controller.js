import { StatusCodes } from "http-status-codes";

//dtos
import { bodyToUser } from "../dtos/user.dto.js";
import { bodyToTryingMission } from "../dtos/mission.dto.js";

//services
import { userSignUp } from "../services/user.service.js";
import { addTryingMission } from "../services/mission.service.js";



//회원가입
export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try{
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  }catch(err){
    next(err);
  }
};


//미션 도전하기
export const handleUserMissionAdd = async(req, res, next) =>{
  console.log("미션 도전하기 요청!");
  console.log("body: ", req.body);

  try{
    const mission = await addTryingMission(bodyToTryingMission(req.body));
    res.status(StatusCodes.OK).success(mission);
  }catch(err){
    next(err);
  }
}

