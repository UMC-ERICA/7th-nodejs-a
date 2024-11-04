import { pool } from "../db.config.js";

export const addReview = async (storeId, reviewData) => {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO review (storeId, userId, starvariablevalues, content) VALUES (?, ?, ?, ?);`,
      [storeId, reviewData.userId, reviewData.starvariablevalues, reviewData.content]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

export const findStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [store] = await conn.query(`SELECT * FROM store WHERE id = ?;`, [storeId]);
    return store.length > 0 ? store[0] : null;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};