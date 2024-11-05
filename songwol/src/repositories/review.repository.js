import { prisma } from "../db.config.js";

export const addReview = async (storeId, reviewData) => {
  try {
    const review = await prisma.review.create({
      data: {
        storeId: storeId,
        userId: reviewData.userId,
        starvariablevalues: reviewData.starvariablevalues,
        content: reviewData.content,
      },
    });
    return review.id;
  } catch (err) {
    throw new Error(`리뷰 추가 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const findStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });
    return store;
  } catch (err) {
    throw new Error(`가게 조회 중 오류가 발생했습니다: ${err.message}`);
  }
};

export const showReview = async (userId) => {
  try {
    const user = await prisma.review.findMany({
      where: { id: userId },
    })
    return user;
  } catch (error) {
    throw new Error(`리뷰 조회 중 오류가 발생했습니다: ${error.message}`);
  }
};