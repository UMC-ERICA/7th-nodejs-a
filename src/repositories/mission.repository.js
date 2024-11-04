import { pool } from "../db.config.js";

export const createMission = async (storeId, missionData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (storeId, task, savePoints, deadline, success) VALUES (?, ?, ?, ?, 'in progress');`,
      [storeId, missionData.task, missionData.savePoints, missionData.deadline]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`미션 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const findMissionById = async (missionId) => {
  const conn = await pool.getConnection();
  try {
    const [mission] = await conn.query(`SELECT * FROM mission WHERE id = ?;`, [missionId]);
    return mission.length > 0 ? mission[0] : null;
  } catch (err) {
    throw new Error(`미션 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};