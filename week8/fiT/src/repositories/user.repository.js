import { prisma } from "../db.config.js";

//계정 찾기
export const getAccount = async (accountId) => {
  const account = await prisma.account.findUnique({where: {id: accountId}});

  if (!account) {
    return null;
  }

  return account;
};

//내 도전중인 미션에 추가하기
export const addMyTryingMisson = async (data) =>{
  const existMission = await prisma.accountMission.findFirst({
    where: {
      Account_id: data.account_id,
      Mission_id: data.mission_id,
    },
  });

  
  if (existMission) {
    return null;
  }

  const MyTryingMission = await prisma.accountMission.create({
    data: {
      success: data.success,

      account: { connect: { id: data.account_id }}, 
      mission: { connect: { id: data.mission_id }}
    },
  });

  return {
    account_id: MyTryingMission.Account_id,
    mission_id: MyTryingMission.Mission_id
  };
}

//내 도전중인 미션 찾기
export const getMyTryingMission = async (accountId) =>{
  const missions = await prisma.accountMission.findMany({where: {Account_id: accountId, success: 'ongoing'}});

  return missions || [];
}

//키를 통해 미션 찾기
export const getTryingMissionBykey = async (accountId, missionId) => {
  const mission = await prisma.accountMission.findUnique({
    where: {
      Account_id_Mission_id: {
        Account_id: accountId,
        Mission_id: missionId
      }
    }
  });

  return mission;
};

//내 리뷰 찾기
export const getMyReviews = async (user_id) => {
  try {
    const reviews = await prisma.review.findMany({
      where: {Account_id: user_id}
    });
    return reviews;
  } 
  catch (error) {
    console.error("DB 에러", error);
    throw new Error('Database error');
  }
};

export const ongoingToSucceed = async (user_id, mission_id) => {
  const mission = await prisma.AccountMission.findUnique({
    where: {
      Account_id_Mission_id: {
        Account_id: user_id,
        Mission_id: mission_id,
      }
    },
    select: {
      success: true
    }
  });

  if (!mission || mission.success !== "ongoing"){
    return null;
  }

  const updatedMission = await prisma.AccountMission.update({
    where:{
      Account_id_Mission_id: {
        Account_id: user_id,
        Mission_id: mission_id,
      },
    },
    data: {
      success: "succeed"
    },
  });

  return updatedMission;
}
