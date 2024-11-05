import { pool } from "../db.config.js";

//계정 찾기
export const getAccount = async (accountId) => {
  const conn = await pool.getConnection();

  try {
    const [account] = await pool.query(`SELECT * FROM account WHERE id = ?;`, accountId);

    console.log(account);

    if (account.length == 0) {
      return null;
    }

    return account;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  } 
};

//내 도전중인 미션에 추가하기
export const addMyTryingMisson = async (data) =>{
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM account_mission WHERE Account_id= ? and Mission_id = ?) AS isExist;`,
      [ 
        data.account_id, 
        data.mission_id 
      ]
    );

    if (confirm[0].isExist !== 1) {
      return null;
    }
    console.log(data);
    const [result] = await pool.query(
      `INSERT INTO account_mission (Account_id, Mission_id, success) VALUES (?, ?, ?);`,
      [
        data.account_id,
        data.mission_id,
        data.state,
      ]
    );

    return result.insertId;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
}

//내 도전중인 미션 찾기
export const getMyTryingMission = async (accountId) =>{
  const conn = await pool.getConnection();

  try {
    const [mission] = await pool.query(`SELECT * FROM account_mission WHERE Account_id = ?;`, accountId);

    console.log(mission);

    if (mission.length != 0) {
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
