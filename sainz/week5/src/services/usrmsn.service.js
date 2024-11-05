import { pool } from '../db.config.js';

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
