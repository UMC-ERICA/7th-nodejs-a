import { pool } from '../db.config.js';

export const AddUserMSN = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user_mission WHERE user_mission_id = ?) `,
      [data.user_mission_id]
    );

    if (confirm[0] === 1) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user_mission (user_id,mission_id,status) VALUES (?, ?, ?);`,
      [data.user_id, data.mission_id, data.status]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
export const getUserMSN = async (user_mission_id) => {
  const conn = await pool.getConnection();

  try {
    const [user_mission] = await pool.query(
      `SELECT * FROM user_mission WHERE user_mission_id = ?;`,
      user_mission_id
    );

    console.log(review);

    if (review.length == 0) {
      return null;
    }

    return review;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
