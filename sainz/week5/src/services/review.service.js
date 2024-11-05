import { AddReview, getReview } from '../repositories/review.repository.js';

export const addnewreview = async (data) => {
  const joinReviewId = await AddReview({
    store_id: data.store_id,
    user_id: data.user_id,
    content: data.content,
    rating: data.rating,
    photo: data.photo,
  });

  if (joinReviewId === null) {
    throw new Error('이미 존재하는 리뷰입니다.');
  }
  const review = await getReview(joinReviewId);
  return review;
};
