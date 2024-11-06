
import { addRes, getRes } from "../repositories/restaurant.repository.js";
  
  export const makeRestaurant = async (data) =>{
      const joinResId = await addRes({
          name: data.name,
          phone: data.phone,
          address: data.address
      });
  
      if(joinResId===null){
          throw new Error("이미 존재하는 가게입니다.");
      }
      const restaurant = await getRes(joinResId);
      return restaurant;
  }