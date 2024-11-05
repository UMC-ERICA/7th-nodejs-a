import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { bodyToMyTryingMission } from "../dtos/user.dto.js";
import { createMyTryingMission } from "../services/user.service.js";
import { createReview } from "../services/review.service.js";

export const newReview = async (req, res, next) => {
  console.log("리뷰 추가를 요청했습니다!");
  console.log("body:", req.body);

  const review = await createReview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};

export const newMyTryingMission = async (req, res, next) => {
  console.log("내 미션 추가를 요청했습니다!");
  console.log("body:", req.body);

  const mission = await createMyTryingMission(bodyToMyTryingMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};
