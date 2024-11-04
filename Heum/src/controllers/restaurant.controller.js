import { StatusCodes } from "http-status-codes";

//dtos
import { bodyToRes } from "../dtos/restaurant.dto.js";
import { bodyToRv } from "../dtos/review.dto.js";
import { bodyToMisson} from "../dtos/mission.dto.js";

//services
import { makeRestaurant } from "../services/restaurant.service.js";
import { postReview } from "../services/review.service.js";
import { makeMission} from "../services/mission.service.js";


//restaurant
export const newRestaurant = async(req, res, next) =>{
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);

    const restaurant = await makeRestaurant(bodyToRes(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
}

//review
export const handleReviewPost = async(req, res, next) =>{
    console.log("가게에 리뷰 달기 요청!");
    console.log("body: ", req.body);
    
    const review = await postReview((bodyToRv(req.body)));
    res.status(StatusCodes.OK).json({ result: review });
}

//mission
export const handleMissionAdd = async(req, res, next) =>{
  console.log("가게에 미션 추가하기 요청!");
  console.log("body:", req.body);
  const mission = await makeMission(bodyToMisson(req.body));
  res.status(201).json({ result: mission });
}