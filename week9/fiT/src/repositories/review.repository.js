import { prisma } from "../db.config.js";

// 리뷰 추가하기
export const addReview = async(data)=>{
    const review = await prisma.review.create({
      data: {
        id: data.id,
        score: data.score,
        content: data.content,
        created_date: data.created_date,
        restaurant: { connect: {id: data.restaurant_id}},
        account: { connect: {id: data.account_id}}
      }
    });
    return review.id;
}

// 리뷰 찾기
export const getReview = async (reviewId) => {
  const review = await prisma.review.findUnique({where: {id: reviewId}});
  return review;
};