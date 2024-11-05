import * as reviewRepository from "../repositories/review.repository.js";

export const addReviewToStoreService = async (storeId, reviewData) => {
  // 가게 존재 여부 확인
  const store = await reviewRepository.findStoreById(storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가
  const reviewId = await reviewRepository.addReview(storeId, reviewData);
  return { reviewId, ...reviewData };
};

export const reviewList = async ( userId ) => {
  const showList = await reviewRepository.showReview(userId);
  return { ...showList}
}