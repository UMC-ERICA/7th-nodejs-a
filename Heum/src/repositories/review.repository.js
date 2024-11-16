import { prisma } from "../db.config.js";

export const checkReview = async (userId, storeId) => {
  const review = await prisma.review.findFirst({ where: { AND: [{ account_xid: userId }, { restaurant_id: storeId }] } });
  return review ? true : false;
};

export const getReview = async (reviewId) => {
  const getreview = await prisma.review.findFirst({ where: { id: reviewId } });
  return getreview;
};

export const addReview = async (data) => {
  const newReview = await prisma.review.create({ data: data });
  return newReview.id;
};

export const getMyStoreReviews = async (userId, storeId, cursor) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      rating: true,
      create_at: true
    },
    where: { AND: [{ account_xid: userId }, { restaurant_id: storeId, id: { gt: cursor } }] },
    orderBy: { id: "asc" },
    take: 5
  });
  return reviews;
};