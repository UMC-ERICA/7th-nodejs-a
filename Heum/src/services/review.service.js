import { getRes } from "../repositories/restaurant.repository.js";
import { addReview, getReview, getMyStoreReviews, checkReview } from '../repositories/review.repository.js';

import { responseFromReviews } from '../dtos/review.dto.js';
import { customError } from "../error.js";

//중복 확인 후 리뷰 생성
export const postReview = async (data) =>{
    try{
        const findResId = await getRes(data.restaurant_id)
        if(findResId === null){
            throw new customError("가게가 존재하지 않아 리뷰를 달 수 없습니다.", data, "404");
        }
        if(await checkReview(data.account_xid, data.restaurant_id)){
            throw new customError("해당 가게에 이미 리뷰를 작성하셨습니다.", data, "409");
        }
        const joinReviewId = await addReview(data);
        const review = await getReview(joinReviewId);
        return review;
    }catch(err){
        if (err instanceof customError) {
            throw err;
        } else {
            throw new customError("리뷰 작성 과정에서 오류가 발생했습니다.", data, "500");
        }
    }
}


export const listMyStoreReviews = async(userId, storeId, cursor) =>{
    try{
        const reviews = await getMyStoreReviews(userId, storeId, cursor);
        return responseFromReviews(reviews);
    }catch(err){
        if (err instanceof customError) {
            throw err;
        }else {
            throw new customError("가게의 리뷰 조회 과정에서 오류가 발생했습니다.", data, "500");
        }
    }
}