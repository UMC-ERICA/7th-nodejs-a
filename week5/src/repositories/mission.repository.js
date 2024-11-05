import { pool } from "../db.config.js";

//미션 추가하기
export const addMission = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [result] = await pool.query(
      `INSERT INTO mission (Restaurant_id, mission_name, deadline, created_date, mission_point) VALUES (?, ?, ?, ?, ?);`,
      [
        data.restaurant_id,
        data.name,
        data.deadline,
        data.create_at,
        data.mission_point
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
}

//미션 찾기
export const getMission = async (missionId) => {
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM mission WHERE id = ?;`, missionId);

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