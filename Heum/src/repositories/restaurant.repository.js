import { pool } from "../db.config.js";

//restaurant 가게 추가하기
export const addRes = async (data) =>{
    const conn = await pool.getConnection();

    try{
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM restaurant WHERE name = ? AND address = ?) AS isExistRes;`,
            [data.name, data.address]
        );

        if(confirm[0].isExistRes === 1){
            return null;
        }

        const [result] = await pool.query(
            `INSERT INTO restaurant (name, phone, address) VALUES (?, ?, ?);`,
            [
              data.name,
              data.phone,
              data.address
            ]
          );

          return result.insertId;
    }catch{
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    }finally{
        conn.release();   //db 연결을 해제
    }
}
// 가게 정보 얻기
export const getRes = async (resId) => {
    const conn = await pool.getConnection();

  try {
    const [restaurant] = await pool.query(`SELECT * FROM restaurant WHERE id = ?;`, resId);

    console.log(restaurant);

    if (restaurant.length == 0) {
      return null;
    }

    return restaurant;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
