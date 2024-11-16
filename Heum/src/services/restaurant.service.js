
import { addRes, getRes } from "../repositories/restaurant.repository.js";
import * as er from "../error.js";
  export const makeRestaurant = async (data) =>{
    try{
      const joinResId = await addRes(data);
      if(joinResId === null){
        throw new er.DuplicateStoreError("이미 존재하는 가게입니다", data, 409);
      }
      const restaurant = await getRes(joinResId);
      return restaurant;
    }catch(err){
      if (err instanceof er.customError) {
        throw err;
      } else {
        throw new er.undefinedStoreError("가게 생성 중 오류가 발생했습니다.", data, 500);
      }
    }
  }