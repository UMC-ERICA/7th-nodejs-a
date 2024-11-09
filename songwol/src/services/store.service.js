import * as storeRepository from '../repositories/store.repository.js';
import { StoreDTO } from '../dtos/store.dto.js';

export const addStoreService = async (storeData) => {
  const storeDTO = StoreDTO(storeData);
  const storeId = await storeRepository.createStore(storeDTO);
  return storeId;
}

export const addReviewToStoreService = async (storeId, reviewData) => {
  // 가게 존재 여부 확인
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new Error("해당 가게가 존재하지 않습니다.");
  }

  // 리뷰 추가
  const reviewId = await storeRepository.addReview(storeId, reviewData);
  return { reviewId, ...reviewData };
};

export const reviewList = async ( userId ) => {
  const showList = await storeRepository.showReview(userId);
  return { ...showList}
}