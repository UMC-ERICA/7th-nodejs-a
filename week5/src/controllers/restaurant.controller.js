import { StatusCodes } from "http-status-codes";
import { bodyToRestuarnt } from "../dtos/restaurant.dto.js";
import { createRestaurant } from "../services/restaurant.service.js";

export const newRestaurant = async (req, res, next) => {
    console.log("가게 추가를 요청했습니다!");
    console.log("body:", req.body);
  
    const restaurant = await createRestaurant(bodyToRestuarnt(req.body));
    res.status(StatusCodes.OK).json({ result: restaurant });
  };