import { pool } from "../db.config.js";

// 식당 추가
export const addRestaurant = async (data) => {
  const conn = await pool.getConnection();

  try {
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM restaurant WHERE restaurant_name = ? AND address = ?) as isExistRestaurant;`,
      [data.name, data.address]
    );

    if (confirm[0].isExistRestaurant) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO restaurant (restaurant_name, address, type, created_date, phone_number) VALUES (?, ?, ?, ?, ?);`,
      [
        data.name,
        data.address,
        data.type,
        data.create_at,
        data.phone_number
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
};

//가게 정보 찾기
export const getRestaurant = async (restaurantId) => {
  const conn = await pool.getConnection();

try {
  const [restaurant] = await pool.query(`SELECT * FROM restaurant WHERE id = ?;`, restaurantId);

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