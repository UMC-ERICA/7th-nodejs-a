import { addReviewToStoreService, reviewList } from '../services/review.service.js';
import { ReviewDTO } from '../dtos/review.dto.js';

export const addReviewToStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const reviewData = new ReviewDTO(req.body);

    const newReview = await addReviewToStoreService(storeId, reviewData);
    res.status(201).json({ message: "리뷰가 추가되었습니다.", data: newReview });
  } catch (error) {
    next(error);
  }
};

export const showReview = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    
    const reviews = await reviewList(userId);
    res.status(201).json({ userId: userId, reviews });
  } catch (error) {
    next(error);
  }
}