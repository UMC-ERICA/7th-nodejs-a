import { prisma } from "../db.config.js";

//restaurant 가게 추가하기
export const addRes = async (data) =>{
    const restaurant = await prisma.restaurant.findFirst({where: {AND: [{name: data.name}, {address: data.address}]}});
    if(restaurant){
      return null;
    }

    const joinResId = await prisma.restaurant.create({data: data});
    return joinResId.id;
}
// 가게 정보 얻기
export const getRes = async (resId) => {
   const restaurant = await prisma.restaurant.findFirst({where: {id: resId}});
   return restaurant;
};
