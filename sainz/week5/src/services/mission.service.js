import { pool } from '../db.config.js';

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
