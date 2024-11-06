import { prisma } from "../db.config.js";

export const getMission = async (missionId) => {
  const getMission = await prisma.mission.findFirst({ where: {id: missionId} });
  return getMission;
};

export const addMission = async (data) =>{
  const confirm = await prisma.mission.findFirst({where: {title: data.title}});
  if(confirm){
    return null;
  }

  const joinMission = await prisma.mission.create({data: data});
  return joinMission.id;
};

export const getStoreMissions = async(storeId, cursor)=>{
  const getMissions = await prisma.mission.findMany({ 
    select: {
      id: true,
      title: true,
      content: true,
      point: true,
      restaurant_id: true,
      deadline: true
    },
    where:{restaurant_id: storeId, id: {gt:cursor}},
    orderBy: { id: "asc" },
    take: 5
  });
  return getMissions;
};




export const getTryMission = async (missionId) =>{
  const getTryMission = await prisma.missionList.findFirst({where: {id: missionId}});
  return getTryMission;
}

export const addTryMisson = async (data) =>{
  const joinTryMission = await prisma.missionList.create({data: data});
  return joinTryMission.id; 
}

export const getTryingMyMissions = async(userId, state, cursor)=>{
  const Missions = await prisma.missionList.findMany({
    select: {
      id: true,
      account_xid: true,
      mission_id: true,
      state: true,
      create_at: true
    },
    where: {account_xid: userId, state: state, id: {gt: cursor}},
    orderBy: {id: "asc"},
    take: 5
  });
  return Missions;
}

export const getChangedMission = async(userId, missionId, state)=>{
  const findid = await prisma.missionList.findFirst(  
  {where: 
    {AND: 
    [{ account_xid: userId },{ mission_id: missionId }]
    }
  });
  if(!findid){
    console.error("findid가 null");
  }
  const mission = await prisma.missionList.update({
    where: {id: findid.id},
    data: {
      state: state
    }
  });
  return mission;
}

