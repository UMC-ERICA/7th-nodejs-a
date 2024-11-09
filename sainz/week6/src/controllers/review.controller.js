import { StatusCodes } from 'http-status-codes';
import { bodyToReview } from '../dtos/review.dto.js';
import { addnewreview } from '../services/review.service.js';
import { listStoreReviews } from '../services/store.service.js';
import { ReadReviews } from '../services/user.service.js';

export const handleAddReview = async (req, res, next) => {
  console.log('리뷰 추가');
  console.log('body:', req.body);

  const review = await addnewreview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(req.params.storeId);
  res.status(StatusCodes.OK).success(reviews);
};
export const handleMyReviewList = async (req, res, next) => {
  const userId = req.params.user_id;
  const reviewResult = await ReadReviews(userId);

  if (reviewResult.success) {
    res
      .status(StatusCodes.OK)
      .json({ userId: userId, reviewList: reviewResult.data });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: reviewResult.message });
  }
};
