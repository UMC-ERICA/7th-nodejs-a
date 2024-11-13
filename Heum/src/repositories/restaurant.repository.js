import { prisma } from "../db.config.js";

//restaurant 가게 추가하기
export const addRes = async (data) =>{
  try{
    const restaurant = await prisma.restaurant.findFirst({where: {AND: [{name: data.name}, {address: data.address}]}});
    if(restaurant){
      return null;
    }
    const joinResId = await prisma.restaurant.create({data: data});
    return joinResId.id;
  }catch(err){
    throw new customError('가게 추가 중 오류가 발생했습니다', data, '500');
  }
}

// 가게 정보 얻기
export const getRes = async (resId) => {
  try{
    const restaurant = await prisma.restaurant.findFirst({where: {id: resId}});
    if(!restaurant){
      return null;
    }
    return restaurant;
  }catch(err){
    throw new customError('가게 조회 중 오류가 발생했습니다', resId, '500');
  }
};
