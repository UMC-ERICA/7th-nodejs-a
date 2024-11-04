import { pool } from "../db.config.js";

//mission -----------------------------------------------------------------------------mission
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

export const addMission = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM mission WHERE title = ?) AS isExistTitle;`,
      data.title
    );

    if (confirm[0].isExistTitle === 1) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO mission (title, content, point, restaurant_id, deadline) VALUES (?, ?, ?, ?, ?);`,
      [
        data.title,
        data.content,
        data.point,
        data.restaurant_id,
        data.deadline
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
//mission -----------------------------------------------------------------------------mission



//Trymission ------------------------------------------------------------------------Trymission
export const getTryMission = async (missionId) =>{
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM missionlist WHERE id = ?;`, missionId);

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
}

export const addTryMisson = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM account, mission WHERE account.xid= ? and mission.id = ?) AS isExist;`,
      [ 
        data.account_xid, 
        data.mission_id 
      ]
    );

    if (confirm[0].isExist !== 1) {
      return null;
    }
    console.log(data);
    const [result] = await pool.query(
      `INSERT INTO missionlist (um_account_xid, um_mission_id, state, create_at) VALUES (?, ?, ?, ?);`,
      [
        data.account_xid,
        data.mission_id,
        data.state,
        data.create_at
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
//Trymission ------------------------------------------------------------------------Trymission