import * as storeService from '../services/store.service.js';
import { ReviewDTO } from '../dtos/review.dto.js';

// 특정 지역에 가게 추가하기
export const addStore = async (req, res, next) => {
  try {
    const storeData = req.body;
    const newStoreId = await storeService.addStoreService(storeData);
    
    res.status(201).json({ message: "가게가 추가되었습니다.", data: newStoreId });
  } catch (error) {
    next(error);
  }
};

// 리뷰 추가
export const addReviewToStore = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const reviewData = new ReviewDTO(req.body);

    const newReview = await storeService.addReviewToStoreService(storeId, reviewData);
    res.status(201).json({ message: "리뷰가 추가되었습니다.", data: newReview });
  } catch (error) {
    next(error);
  }
};

// 리뷰 조회
export const showReview = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    
    const reviews = await storeService.reviewList(userId);
    res.status(201).json({ userId: userId, reviews });
  } catch (error) {
    next(error);
  }
}