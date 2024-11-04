// DB 접근
import { pool } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const conn = await pool.getConnection();
  try {
    const [confirm] = await conn.query(
      `SELECT EXISTS(SELECT 1 FROM users WHERE email = ?) as isExistEmail;`,
      [data.email]
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    // 사용자 추가
    const [result] = await conn.query(
      `INSERT INTO users (email, name, gender, birth, address, number) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.name,
        data.gender,
        data.birth,
        data.address,
        data.number,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(`사용자 추가 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [user] = await conn.query(`SELECT * FROM users WHERE id = ?;`, [userId]);

    console.log("Fetched user:", user);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (err) {
    throw new Error(`사용자 조회 중 오류가 발생했습니다: ${err.message}`);
  } finally {
    conn.release();
  }
};