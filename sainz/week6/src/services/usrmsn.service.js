import { pool } from '../db.config.js';
import { prisma } from '../db.config.js';
import { AddUserMSN, getUserMSN } from '../repositories/usrmsn.repository.js';

export const AddUserMission = async (data) => {
  const AddUSERMSNID = await AddUserMSN({
    user_id: data.user_id,
    mission_id: data.mission_id,
    status: data.status,
  });

  const [missionExists] = await pool.query(
    `SELECT EXISTS(SELECT 1 FROM mission WHERE store_id = ?) AS missionexists`,
    [data.store_id]
  );
  if (!missionExists[0].missionexists) {
    throw new Error('이미 진행중인 상점입니다.');
  }

  const store = await getUserMSN(AddUSERMSNID);
  return store;
};

export const ReadMyMission = async (userId) => {
  try {
    const mymissions = await prisma.UserMission.findMany({
      where: {
        user_id: userId,
        status: 'on',
      },
    });

    if (mymissions.length === 0) {
      return {
        success: false,
        message: 'No MyMissions found',
      };
    }
    return {
      success: true,
      data: mymissions,
    };
  } catch (error) {
    console.error('Error fetching missions:', error);
    return {
      success: false,
      message: 'Error fetching missions.',
    };
  }
};

export const UpdateMyMission = async (userId, missionId) => {
  try {
    const missionup = await prisma.UserMission.findMany({
      where: {
        user_id: userId,
        mission_id: missionId,
        status: 'on',
      },
    });
    console.log(missionup);

    if (!missionup) {
      return {
        success: false,
        message: 'No MyMissions found',
      };
    }
    const updatedMission = await prisma.UserMission.update({
      where: {
        user_mission_id: missionup[0].user_mission_id,
      },
      data: {
        status: 'off',
      },
    });
    return {
      success: true,
      data: updatedMission,
      message: 'Status updated to off.',
    };
  } catch (error) {
    console.error('Error fetching or updating mission:', error);
    return {
      success: false,
      message: 'Error fetching or updating mission.',
    };
  }
};
