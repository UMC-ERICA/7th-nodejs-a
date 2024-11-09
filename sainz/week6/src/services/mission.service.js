import { pool } from '../db.config.js';
import { prisma } from '../db.config.js';

import { responseFromStore } from '../dtos/mission.dto.js';
import { addMission, getMission } from '../repositories/mission.repository.js';

export const StoreAddMission = async (data) => {
  const AddStoreID = await addMission({
    title: data.title,
    content: data.content,
    points: data.points,
    store_id: data.store_id,
    deadline: data.deadline,
  });

  const [storeExists] = await pool.query(
    `SELECT EXISTS(SELECT 1 FROM store WHERE store_id = ?) AS storeexists`,
    [data.store_id]
  );
  if (!storeExists[0].storeExists) {
    throw new Error('없는 상점입니다.');
  }

  const store = await getMission(AddStoreID);

  return responseFromStore({ store });
};

export const Readmission = async (storeId) => {
  try {
    // 상점 ID를 기준으로 리뷰 리스트 가져오기
    const missions = await prisma.mission.findMany({
      where: {
        store_id: storeId,
      },
    });

    // 미션이 없다면 빈 배열 반환
    if (missions.length === 0) {
      return {
        success: false,
        message: 'No missions found.',
      };
    }
    return {
      success: true,
      data: missions,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      message: 'Error fetching reviews.',
    };
  }
};
