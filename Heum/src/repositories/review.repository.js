import { prisma } from "../db.config.js";

export const getReview = async (reviewId) => {
  const getreview = await prisma.review.findFirst({where: {id: reviewId}});
  return getreview;
};


export const addReview = async(data)=>{
  //전달받은 데이터로 리뷰 생성
  const joinReview = await prisma.review.create({ data: data });
  return joinReview.id;
}

export const getMyStoreReviews = async(userId, storeId, cursor)=>{
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      rating: true,
      create_at: true
    },
    where: { AND: [{account_xid: userId}, {restaurant_id: storeId, id: {gt: cursor }}]},
    orderBy: {id: "asc"},
    take: 5
  });

  return reviews;
}