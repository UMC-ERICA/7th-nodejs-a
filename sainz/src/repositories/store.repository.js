import { pool } from '../db.config.js';

export const AddStore = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM store WHERE store_name = ?) AS isExistStore;`,
      [data.store_name]
    );

    if (confirm[0].isExistTitle === 1) {
      return null; // 이미 존재하는 제목일 경우
    }

    const [result] = await pool.query(
      `INSERT INTO store (store_name, category,location) VALUES (?, ?, ?);`,
      [data.store_name, data.category, data.location]
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
export const getStore = async (store_id) => {
  const conn = await pool.getConnection();

  try {
    const [store] = await pool.query(
      `SELECT * FROM store WHERE store_id = ?;`,
      store_id
    );

    console.log(store);

    if (store.length == 0) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
