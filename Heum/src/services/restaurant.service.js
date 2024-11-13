
import { addRes, getRes } from "../repositories/restaurant.repository.js";
import {customError} from "../error.js";
  export const makeRestaurant = async (data) =>{
    try{
      const joinResId = await addRes(data);
      if(joinResId === null){
        throw new customError("이미 존재하는 가게입니다", data, "409");
      }
      const restaurant = await getRes(joinResId);
      return restaurant;
    }catch(err){
      if (err instanceof customError) {
        throw err;
      } else {
        throw new customError("가게 생성 중 오류가 발생했습니다.", data, "500");
      }
    }
  }