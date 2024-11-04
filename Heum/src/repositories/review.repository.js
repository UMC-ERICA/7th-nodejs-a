import { pool } from "../db.config.js";

export const getReview = async (reviewId) => {
  const conn = await pool.getConnection();

	try {
	  const [review] = await pool.query(`SELECT * FROM review WHERE id = ?;`, reviewId);
	
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


export const addReview = async(data)=>{
  const conn = await pool.getConnection();

    try{
        const [result] = await pool.query(
            `INSERT INTO review (account_xid, restaurant_id, title, body, rating, create_at) VALUES (?, ?, ?, ?, ?, ?);`,
            [
              data.account_xid,
              data.restaurant_id,
              data.title,
              data.body,
              data.rating,
              data.create_at
            ]
          );

          return result.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    }finally{
        conn.release();   //db 연결을 해제
    }
}