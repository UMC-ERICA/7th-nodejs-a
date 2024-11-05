import { StatusCodes } from 'http-status-codes';
import { bodyToReview } from '../dtos/review.dto.js';
import { addnewreview } from '../services/review.service.js';

export const handleAddReview = async (req, res, next) => {
  console.log('리뷰 추가');
  console.log('body:', req.body);

  const review = await addnewreview(bodyToReview(req.body));
  res.status(StatusCodes.OK).json({ result: review });
};
