import { pool } from '../db.config.js';
import { prisma } from '../db.config.js';

import { responseFromStore } from '../dtos/mission.dto.js';
import { StoreMissionNotFoundError, StoreNotFoundError } from '../errors.js';
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
  if (!storeExists[0].storeexists) {
    throw new StoreNotFoundError('Store Not found', data.store_id);
  }

  const store = await getMission(AddStoreID);

  return responseFromStore({ store });
};

//week7 mission
export const Readmission = async (storeId) => {
  try {
    console.log(storeId);
    const storeIdInt = parseInt(storeId, 10);
    console.log('Parsed storeIdInt:', storeIdInt);
    const existingStore = await prisma.mission.findFirst({
      where: { store_id: storeIdInt },
    });

    if (!existingStore) {
      throw new StoreNotFoundError('store not found', storeId);
    }
    // 상점 ID를 기준으로 리스트 가져오기
    const missions = await prisma.mission.findMany({
      where: {
        store_id: storeIdInt,
      },
      select: {
        mission_id: true,
        store_id: true,
        points: true,
        deadline: true,
      },
    });

    // 미션이 없다면 빈 배열 반환
    if (missions.length === 0) {
      throw new StoreMissionNotFoundError('Mission Not Found', storeIdInt);
    }
    return {
      success: true,
      data: missions,
    };
  } catch (error) {
    throw error;
  }
};
