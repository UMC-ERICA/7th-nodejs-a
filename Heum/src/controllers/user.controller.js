import { StatusCodes } from "http-status-codes";

//dtos
import { bodyToUser } from "../dtos/user.dto.js";
import { bodyToTryingMission } from "../dtos/mission.dto.js";

//services
import { userSignUp } from "../services/user.service.js";
import { addTryingMission } from "../services/mission.service.js";



//회원가입
export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      $ref: "#/components/userSchemas/userRequest"
    };
    #swagger.responses[200] = {
      $ref: "#/components/userSchemas/user_200"
    };
    #swagger.responses[404] = {
      $ref: "#/components/userSchemas/user_404"
    };
    #swagger.responses[500] = {
      $ref: "#/components/userSchemas/user_500"
    };
  */
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
  /*
  #swagger.summary = '미션 도전하기 API'
  #swagger.requestBody = {
    $ref: "#/components/missionListSchemas/missionListRequest"
  };
  #swagger.responses[200] = {
    $ref: "#/components/missionListSchemas/missionListAdd_200"
  };
  #swagger.responses[404_1] = {
    $ref: "#/components/missionListSchemas/missionListAdd_404_1"
  };
  #swagger.responses[404_2] = {
    $ref: "#/components/missionListSchemas/missionListAdd_404_2"
  };
  #swagger.responses[500] = {
    $ref: "#/components/missionListSchemas/missionListAdd_500"
  };
  */
  console.log("미션 도전하기 요청!");
  console.log("body: ", req.body);

  try{
    const mission = await addTryingMission(bodyToTryingMission(req.body));
    res.status(StatusCodes.OK).success(mission);
  }catch(err){
    next(err);
  }
}

