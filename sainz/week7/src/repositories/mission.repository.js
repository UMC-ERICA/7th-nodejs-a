import { Prisma } from '@prisma/client';

export const addMission = async (data) => {
  const mission = await prisma.mission.findFirst({
    where: { title: data.title },
  });
  if (mission) {
    return null;
  }

  const createdMission = await prisma.mission.create({
    data: {
      store_id: data.store_id,
      points: data.points,
      deadline: data.deadline,
      title: data.title,
      content: data.content,
    },
  });
  return createdMission.id;
};

export const getMission = async (missionId) => {
  const mission = await prisma.mission.findFirstorThrow({
    where: { id: missionId },
  });
  return mission;
};
export const getStoreMission = async (store_id) => {
  try {
    const storeMission = await prisma.mission.findFirstOrThrow({
      where: { id: store_id },
    });
    return storeMission;
  } catch (error) {
    console.error(error);
    return null;
  }
};
