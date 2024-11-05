// import { pool } from '../db.config.js';

// // Store 데이터 삽입
// export const addMission = async (data) => {
//   const conn = await pool.getConnection();

//   try {
//     const [confirm] = await pool.query(
//       `SELECT EXISTS(SELECT 1 FROM mission WHERE title = ?) AS isExistTitle;`,
//       data.title
//     );

//     if (confirm[0].isExistTitle === 1) {
//       return null;
//     }

//     const [result] = await pool.query(
//       `INSERT INTO mission (store_id,points,deadline,title,content) VALUES (?, ?, ?, ?,?);`,
//       [data.store_id, data.points, data.deadline, data.title, data.content]
//     );

//     return result.insertId;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };
// export const getMission = async (missionId) => {
//   const conn = await pool.getConnection();

//   try {
//     const [mission] = await pool.query(
//       `SELECT * FROM mission WHERE id = ?;`,
//       missionId
//     );

//     console.log(mission);

//     if (mission.length == 0) {
//       return null;
//     }

//     return mission;
//   } catch (err) {
//     throw new Error(
//       `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
//     );
//   } finally {
//     conn.release();
//   }
// };

import { pool } from '../db.config.js';

export const addMission = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE title = ?) AS isExistTitle;`,
      data.title
    );

    if (confirm[0].isExistTitle === 1) {
      return null; // 이미 존재하는 제목일 경우
    }

    const [result] = await pool.query(
      `INSERT INTO mission (store_id, points, deadline, title, content) VALUES (?, ?, ?, ?, ?);`,
      [data.store_id, data.points, data.deadline, data.title, data.content]
    );

    return result.insertId; // 새로 삽입된 mission의 ID 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(
      `SELECT * FROM mission WHERE mission_id = ?;`,
      missionId
    );

    console.log(mission);

    if (mission.length == 0) {
      return null;
    }

    return mission;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
