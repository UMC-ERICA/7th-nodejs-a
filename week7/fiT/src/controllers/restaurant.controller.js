import { StatusCodes } from "http-status-codes";
import { bodyToRestuarnt } from "../dtos/restaurant.dto.js";
import { createRestaurant } from "../services/restaurant.service.js";
import { findMissionOfRestaurant } from '../services/restaurant.service.js'

export const newRestaurant = async (req, res, next) => {
  try{
    const restaurant = await createRestaurant(bodyToRestuarnt(req.body));
    if(restaurant.success){
      res.status(StatusCodes.OK).success(restaurant);
    }
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  }
  catch(error){
    next(error);
  }
};

export const readmissionOfRestaurant = async (req, res, next) => {
  const restaurantId = req.params.restaurant_id;
  try{
    const missionOfRestaurant = await findMissionOfRestaurant(restaurantId);  
  
    if (missionOfRestaurant.success) {
      const response = JSON.parse(
        JSON.stringify(missionOfRestaurant.data, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value))
      res.status(StatusCodes.OK).success(response);  
    }
    else {
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  }
  catch(error){
    next(error);
  }
}