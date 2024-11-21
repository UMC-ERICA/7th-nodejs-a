import { prisma } from '../db.config.js';

export const AddReview = async (data) => {
  const review = await prisma.review.findFirst({
    where: { review_id: data.review_id },
  });
  if (review_id) {
    return null;
  }
  const createdReview = await prisma.review.create({
    data: {
      store_id: data.store_id,
      user_id: data.user_id,
      content: data.content,
      rating: data.rating,
      photo: data.photo,
    },
  });
  return createdReview.id;
};

export const getReview = async (review_id) => {
  const review = await prisma.review.findFirstOrThrow({
    where: { id: review_id },
  });
  return review;
};

export const getMyReviews = async (user_id) => {
  try {
    const usereview = await prisma.review.findFirstOrThrow({
      where: { id: user_id },
    });
    return usereview;
  } catch (error) {
    console.error(error);
    return null;
  }
};
