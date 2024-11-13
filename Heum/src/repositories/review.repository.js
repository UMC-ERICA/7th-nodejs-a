import { prisma } from "../db.config.js";
import { customError } from "../error.js";


export const checkReview = async (userId, storeId) => {
  try{
    const review = await prisma.review.findFirst({where: {AND: [{account_xid: userId}, {restaurant_id: storeId}]}});
    if(review){
      return true;
    }else{
      return false;
    }
  }catch(err){
    throw new customError('리뷰 중복 확인 중 오류가 발생했습니다', userId, '500');
  }
}

export const getReview = async (reviewId) => {
  try{
    const getreview = await prisma.review.findFirst({where: {id: reviewId}});
    return getreview;
  }catch(err){
    throw new customError('리뷰 조회 중 오류가 발생했습니다', reviewId, '500');
  }
  
};

export const addReview = async(data)=>{
  try{
    const joinReview = await prisma.review.create({ data: data });
    return joinReview.id;
  }catch(err){
    throw new customError('리뷰 추가 중 오류가 발생했습니다', data, '500');
  }
  
}

export const getMyStoreReviews = async(userId, storeId, cursor)=>{
  try{
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
    
  }catch(err){
    throw new customError('리뷰 조회 중 오류가 발생했습니다', userId, '500');
  }
}