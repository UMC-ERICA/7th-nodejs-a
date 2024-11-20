import { pool } from '../db.config.js';
import { prisma } from '../db.config.js';
import { AddUserMSN, getUserMSN } from '../repositories/usrmsn.repository.js';
import {
  MymissionNotFoundError,
  OnMissionNotFoundError,
  UserNotFoundError,
} from '../errors.js';

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
    const userIdInt = parseInt(userId, 10);

    const existingUser = await prisma.UserMission.findFirst({
      where: { user_id: userIdInt },
    });

    const mymissions = await prisma.UserMission.findMany({
      where: {
        user_id: userIdInt,
        status: 'on',
      },
    });
    console.log(userIdInt);

    if (!existingUser) {
      throw new UserNotFoundError('User not found', userIdInt);
    }
    if (mymissions.length === 0) {
      throw new MymissionNotFoundError('MyMissonNot', userIdInt);
    }
    return {
      success: true,
      data: mymissions,
    };
  } catch (error) {
    console.error('Error fetching missions:', error);
    throw error;
  }
};

export const UpdateMyMission = async (userId, missionId) => {
  try {
    const userIdInt = parseInt(userId, 10);
    const missionIdInt = parseInt(missionId, 10);

    const existingUser = await prisma.UserMission.findFirst({
      where: { user_id: userIdInt },
    });

    console.log('user id:', userIdInt);
    console.log(missionIdInt);

    const missionup = await prisma.UserMission.findMany({
      where: {
        user_id: userIdInt,
        mission_id: missionIdInt,
        status: 'on',
      },
    });
    console.log(missionup);

    if (!existingUser) {
      throw new UserNotFoundError('User not found', userIdInt);
    }
    if (missionup.length == 0) {
      throw new OnMissionNotFoundError(
        'No Ongoing Missions',
        userIdInt,
        missionIdInt
      );
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
    throw error;
  }
};
