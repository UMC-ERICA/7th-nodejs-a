import { prisma } from "../db.config.js";
import { customError } from "../error.js";

export const getMission = async (missionId) => {
  try{
    const getMission = await prisma.mission.findFirst({ where: {id: missionId} });
    return getMission;
  }catch(err){
    throw new customError('미션 조회 중 오류가 발생했습니다', missionId, '500');
  }
};

export const addMission = async (data) =>{
  try{
    const confirm = await prisma.mission.findFirst({where: {title: data.title}});
    if(confirm){
      return null;
    }
  
    const joinMission = await prisma.mission.create({data: data});
    return joinMission.id;
  }catch(err){
    throw new customError('미션 생성 중 오류가 발생했습니다', data, '500');
  }
  
};

export const getStoreMissions = async(storeId, cursor)=>{
  try{
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
  }catch(err){
    throw new customError('가게의 미션 조회 중 오류가 발생했습니다', storeId, '500');
  }
 
};




export const getTryMission = async (missionId) =>{
  try{
    const getTryMission = await prisma.missionList.findFirst({where: {id: missionId}});
    return getTryMission;
  }catch(err){
    throw new customError('미션 조회 중 오류가 발생했습니다', missionId, '500');
  }
  
}

export const addTryMisson = async (data) =>{
  try{
    const joinTryMission = await prisma.missionList.create({data: data});
    return joinTryMission.id; 
  }catch(err){
    throw new customError('미션 생성 중 오류가 발생했습니다', data, '500');
  }
}

export const getTryingMyMissions = async(userId, state, cursor)=>{
  try{
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
  }catch(err){
    throw new customError(`나의 ${state} 미션 조회 중 오류가 발생했습니다.`, userId, '500');
  }
  
}


export const getMissionList = async(userId,missionId)=>{
  try{
    const getMission = await prisma.missionList.findFirst(  {where: {AND: [{ account_xid: userId },{ mission_id: missionId }]}});
    console.log(getMission.id);
    return getMission.id;
  }catch(err){
    throw new customError('미션 조회 중 오류가 발생했습니다', {account_xid: userId, mission_id: missionId}, '500');
  }
}
export const changeMissionList = async(missionListId, state)=>{
  try{
    const mission = await prisma.missionList.update({
      where: { id: missionListId },
      data: { state: state }
    });
    return mission;

  }catch(err){
    throw new customError('미션 상태 변경 중 오류가 발생했습니다', {mission_id: missionListId, state:state}, '500');
  }
}

