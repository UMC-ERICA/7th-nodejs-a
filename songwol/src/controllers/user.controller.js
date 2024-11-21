import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string", example: "test@example.com" },
              name: { type: "string", example: "홍길동" },
              gender: { type: "string", example: "M" },
              birth: { type: "string", format: "date", example: "1990-01-01" },
              address: { type: "string", example: "서울특별시 강남구" },
              detailAddress: { type: "string", example: "101호" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              preferences: { type: "array", items: { type: "number" }, example: [1, 2, 3] }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string", example: "test@example.com" },
                  name: { type: "string", example: "홍길동" },
                  preferCategory: { type: "array", items: { type: "string" }, example: ["한식", "치킨"] }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "회원 가입 실패 - 잘못된 요청",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string", example: "유효하지 않은 이메일 주소입니다." },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    const user = await userSignUp(bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    next(error);
  }
};