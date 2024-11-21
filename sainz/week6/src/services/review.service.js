import { AddReview, getReview } from '../repositories/review.repository.js';
import { prisma } from '../db.config.js';
import { bodyToReview } from '../dtos/review.dto.js';

export const addnewreview = async (body) => {
  const reviewData = bodyToReview(body);

  // AddReview를 호출하며 DTO 전달
  const joinReviewId = await AddReview(reviewData);

  if (joinReviewId === null) {
    throw new Error('이미 존재하는 리뷰입니다.');
  }
  const review = await getReview(joinReviewId);
  return review;
};
export const ReadReviews = async (userId) => {
  try {
    // 유저 ID를 기준으로 리뷰 리스트 가져오기
    const reviews = await prisma.review.findMany({
      where: {
        user_id: userId,
      },
    });

    // 리뷰가 없다면 빈 배열 반환
    if (reviews.length === 0) {
      return {
        success: false,
        message: 'No reviews found.',
      };
    }
    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      message: 'Error fetching reviews.',
    };
  }
};
