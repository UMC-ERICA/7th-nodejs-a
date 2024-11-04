import { pool } from "../db.config.js";

// User 데이터 삽입 
// 입력: 만들 User의 정보들
// 출력: 만들어진 User의 insertId값
export const addUser = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM Account WHERE phone = ?) AS isExistPhone;`,
      data.phone
    );

    if (confirm[0].isExistPhone === 1) {
      return null;
    }
//await pool.query(x1, x2) : x1은 sql문, x2는 sql문의 Prepared Statement(?)에 들어갈 값 배열 형태로 지정
    const [result] = await pool.query(
      `INSERT INTO Account (nickname, create_at, name, phone, birth, address, state, point) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        data.nickname,
        data.create_at,
        data.name,
        data.phone,
        data.birth,
        data.address,
        data.state,
        data.point,
        data.food
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();   //db 연결을 해제
  }
};

// 사용자 정보 얻기
// 입력: userId값
// 출력: 해당하는 유저의 정보
export const getUser = async (userId) => {
  const conn = await pool.getConnection();

  try {
    const [user] = await pool.query(`SELECT * FROM Account WHERE xid = ?;`, userId);

    console.log(user);

    if (user.length == 0) {
      return null;
    }

    return user;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};



