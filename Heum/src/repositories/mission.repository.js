import { prisma } from "../db.config.js";

export const getMission = async (missionId) => {
  const getMission = await prisma.mission.findFirst({ where: { id: missionId } });
  return getMission;
};

export const addMission = async (data) => {
  const confirm = await prisma.mission.findFirst({ where: { title: data.title } });
  if (confirm) {
    return null;
  }

  const joinMission = await prisma.mission.create({ data: data });
  return joinMission.id;
};

export const getStoreMissions = async (storeId, cursor) => {
  const missions = await prisma.mission.findMany({
    where: { restaurant_id: storeId },
    cursor: cursor ? { id: cursor } : undefined,
    take: 10,
  });
  return missions;
};

export const getTryMission = async (missionId) => {
  const tryMission = await prisma.tryMission.findFirst({ where: { id: missionId } });
  return tryMission;
};

export const addTryMission = async (data) => {
  const joinTryMission = await prisma.tryMission.create({ data: data });
  return joinTryMission.id;
};

export const getStoreTryMissions = async (storeId, cursor) => {
  const tryMissions = await prisma.tryMission.findMany({
    where: { storeId: storeId },
    cursor: cursor ? { id: cursor } : undefined,
    take: 10,
  });
  return tryMissions;
};

export const getTryingMyMissions = async (userId, state, cursor) => {
  const Missions = await prisma.missionList.findMany({
    select: {
      id: true,
      account_xid: true,
      mission_id: true,
      state: true,
      create_at: true
    },
    where: { account_xid: userId, state: state, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5
  });
  return Missions;
};

export const getMissionList = async (userId, missionId) => {
  const getMission = await prisma.missionList.findFirst({
    where: { AND: [{ account_xid: userId }, { mission_id: missionId }] }
  });
  console.log(getMission.id);
  return getMission.id;
};

export const changeMissionList = async (missionListId, state) => {
  const mission = await prisma.missionList.update({
    where: { id: missionListId },
    data: { state: state }
  });
  return mission;
};
