import { pool } from '../db.config.js';

export const AddReview = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM review WHERE review_id = ?) AS isExistStore;`,
      [data.review_id]
    );

    if (confirm[0].isExistStore === 1) {
      return null; // 이미 존재하는 제목일 경우
    }

    const [result] = await pool.query(
      `INSERT INTO review (store_id,user_id,content,rating,photo) VALUES (?, ?, ?, ?, ?);`,
      [data.store_id, data.user_id, data.content, data.rating, data.photo]
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
export const getReview = async (review_id) => {
  const conn = await pool.getConnection();

  try {
    const [review] = await pool.query(
      `SELECT * FROM review WHERE review_id = ?;`,
      review_id
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
