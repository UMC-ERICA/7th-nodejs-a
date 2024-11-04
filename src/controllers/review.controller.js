import { addReviewToStoreService } from '../services/review.service.js';
import { ReviewDTO } from '../dtos/review.dto.js';

export const addReviewToStore = async (req, res, next) => {
  try {
    const { storeId } = req.params;  // storeId를 URL 파라미터에서 추출
    const reviewData = new ReviewDTO(req.body);  // DTO를 통해 리뷰 데이터를 생성

    // 리뷰 추가 서비스 호출
    const newReview = await addReviewToStoreService(storeId, reviewData);
    res.status(201).json({ message: "리뷰가 추가되었습니다.", data: newReview });
  } catch (error) {
    next(error);  // 에러를 다음 미들웨어로 전달
  }
};