import { prisma } from "../db.config.js";

export const createStore = async (storeData) => {
  try {
    const newStore = await prisma.store.create({
      data: {
        name: storeData.name,
        location: storeData.location,
        phone: storeData.phone,
      },
    });
    return newStore.id;
  } catch (error) {
    throw new Error(`가게 추가 중 오류가 발생했습니다: ${error.message}`);
  }
};