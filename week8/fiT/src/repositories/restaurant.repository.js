import { prisma } from "../db.config.js";

// 식당 추가
export const addRestaurant = async (data) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      AND: [
        { restaurant_name: data.restaurant_name }, 
        { address: data.address }
      ]
    }
  });
  //중복체크
  if (restaurant) {
    return null;
  }

  const createdRestaurant = await prisma.restaurant.create({data: data});
  return createdRestaurant.id;
};

//가게 정보 찾기
export const getRestaurant = async (restaurantId) => {
    const restaurant = await prisma.restaurant.findUnique({where: {id: restaurantId}});
    return restaurant;
};

//해당 식당의 미션 가져오기
export const getMissionOfRestaurant = async (restaurant_id) => {
  try {
    const MissionsOfRestaurant = await prisma.mission.findMany({
      where: { Restaurant_id: restaurant_id },  
    });
    return MissionsOfRestaurant;
  } catch (error) {
    console.error("DB 실패", error);
    throw new Error("Database error");
  }
};
