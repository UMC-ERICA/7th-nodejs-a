import { prisma } from '../db.config.js';

export const AddStore = async (data) => {
  try {
    const existingStore = await prisma.store.findUnique({
      where: {
        store_name: data.store_name,
      },
    });

    if (existingStore) {
      return null;
    }

    const createdStore = await prisma.store.create({
      data: {
        store_name: data.store_name,
        category: data.category,
        location: data.location,
      },
    });

    return createdStore.id;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const getStore = async (store_id) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        store_id: store_id,
      },
    });

    if (!store) {
      return null;
    }

    return store;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};
