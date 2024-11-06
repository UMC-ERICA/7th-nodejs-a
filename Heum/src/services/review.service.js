import { getRes } from "../repositories/restaurant.repository.js";
import { addReview, getReview, getMyStoreReviews } from '../repositories/review.repository.js';

import { responseFromReviews } from '../dtos/review.dto.js';

export const postReview = async (data) =>{
    const findResId = await getRes(data.restaurant_id)
    if(findResId === null){
        throw new Error("가게가 존재하지 않아 리뷰를 달 수 없습니다.");
    }else{
        const joinReviewId = await addReview({
            account_xid: data.account_xid,
            restaurant_id: data.restaurant_id,
            title: data.title,
            body: data.body,
            rating: data.rating,
            create_at: data.create_at
        });
        const review = await getReview(joinReviewId);
        return review;
    }
}

export const listMyStoreReviews = async(userId, storeId, cursor) =>{
    console.log("listMysStoreReview: ", userId, storeId, cursor);
    const reviews = await getMyStoreReviews(userId, storeId, cursor);
    return responseFromReviews(reviews);
}