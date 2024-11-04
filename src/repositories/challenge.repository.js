import { pool } from "../db.config.js";

export const findChallengeByUserAndMission = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [challenge] = await conn.query(
      `SELECT * FROM usermission WHERE userId = ? AND missionId = ?;`,
      [userId, missionId]
    );
    return challenge.length > 0 ? challenge[0] : null;
  } catch (err) {
    throw new Error(`도전 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const createChallenge = async (userId, missionId) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO usermission (userId, missionId) VALUES (?, ?);`,
      [userId, missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`도전 생성 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};