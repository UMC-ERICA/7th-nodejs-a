import { prisma } from "../db.config.js";

// 특정 지역에 가게 추가하기
export const createStore = async (storeData) => {
  const newStore = await prisma.store.create({
    data: {
      name: storeData.name,
      location: storeData.location,
      phone: storeData.phone,
    },
  });
  return newStore.id;
};

// 리뷰 추가
export const addReview = async (storeId, reviewData) => {
  const review = await prisma.review.create({
    data: {
      storeId: storeId,
      userId: reviewData.userId,
      starvariablevalues: reviewData.starvariablevalues,
      content: reviewData.content,
    },
  });
  return review;
};

// 가게 조회
export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });
  return store;
};

// 리뷰 조회
export const showReview = async (userId) => {
  const review = await prisma.review.findMany({
    where: { id: userId },
  })
  return review;
};