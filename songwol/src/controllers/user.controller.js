//로직 설정
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  console.log("Final User Object:", user); // 최종 반환값 - undefined
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    message: "회원가입 완료"
  });
};