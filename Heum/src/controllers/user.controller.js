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

  const user = await userSignUp(bodyToUser(req.body));
  //res.status(statusCode): 응답의 HTTP 상태 코드를 설정합니다. 예를 들어, StatusCodes.OK는 200 상태 코드를 나타냅니다.
  res.status(StatusCodes.OK).json({ result: user });
};


//사용자 도전목록에 가게미션 추가
export const handleUserMissionAdd = async(req, res, next) =>{
  console.log("가게 미션을 도전중인 미션으로 추가 요청!");
  console.log("body: ", req.body);

  const mission = await addTryingMission(bodyToTryingMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
}

