import { pool } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async(data)=>{
  const conn = await pool.getConnection();

    try{
      const [review] = await pool.query(
          `INSERT INTO review (Restaurant_id, Account_id, score, content, created_date) VALUES (?, ?, ?, ?, ?);`,
          [
            data.restaurant_id,
            data.account_id,
            data.score,
            data.content,
            data.create_at
          ]
        );

        return review.insertId;
    }catch(err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
          );
    }finally{
        conn.release();   //db 연결을 해제
    }
}

// 리뷰 찾기
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