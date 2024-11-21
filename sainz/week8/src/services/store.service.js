import { AddStore, getStore } from '../repositories/store.repository.js';
import { getAllStoreReviews } from '../repositories/user.repository.js';
import { responseFromReviews } from '../dtos/store.dto.js';

export const addnewstore = async (data) => {
  const joinStoreId = await AddStore({
    store_name: data.store_name,
    category: data.category,
    location: data.location,
  });

  if (joinStoreId === null) {
    throw new Error('이미 존재하는 가게입니다.');
  }
  const store = await getStore(joinStoreId);
  return store;
};
export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
