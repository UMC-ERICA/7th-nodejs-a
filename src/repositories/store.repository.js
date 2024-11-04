import { pool } from "../db.config.js";

export const createStore = async (storeData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO store (name, location, phone) VALUES (?, ?, ?);`,
      [storeData.name, storeData.location, storeData.phone]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`가게 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};