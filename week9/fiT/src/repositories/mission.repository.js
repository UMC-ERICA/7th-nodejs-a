import { prisma } from "../db.config.js";

//미션 추가하기
export const addMission = async (data) => {
  const mission = await prisma.mission.create({
    data: {
      mission_name: data.mission_name,
      deadline: data.deadline,
      created_date: data.created_date,
      mission_point: data.mission_point,
      restaurant: {
        connect: { id: data.restaurant_id }, // restaurant_id 외래 키 연결
      },
    },
  });
  
  return mission.id;  // 생성된 Mission의 id 반환
};


//미션 찾기
export const getMission = async (missionId) => {
  const mission = await prisma.mission.findUnique({where: {id: missionId}});
  return mission;
};