import { prisma } from "../db.config.js";

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

export const addReview = async (storeId, reviewData) => {
  const review = await prisma.review.create({
    data: {
      storeId: storeId,
      userId: reviewData.userId,
      starvariablevalues: reviewData.starvariablevalues,
      content: reviewData.content,
    },
  });
  return review.id;
};

export const findStoreById = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });
  return store;
};

export const showReview = async (userId) => {
  const user = await prisma.review.findMany({
    where: { id: userId },
  })
  return user;
};