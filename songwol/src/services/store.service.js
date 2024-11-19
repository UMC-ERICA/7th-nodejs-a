import * as storeRepository from '../repositories/store.repository.js';
import { StoreDTO } from '../dtos/store.dto.js';
import { undefinedStoreError } from "../errors.js";

// 특정 지역에 가게 추가하기
export const addStoreService = async (storeData) => {
  const storeDTO = StoreDTO(storeData);
  const storeId = await storeRepository.createStore(storeDTO);
  return storeId;
}

// 리뷰 추가
export const addReviewToStoreService = async (storeId, reviewData) => {
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new undefinedStoreError("해당 가게가 존재하지 않습니다.", storeId);
  }

  const reviewId = await storeRepository.addReview(storeId, reviewData);
  return { reviewId, reviewData };
};

// 리뷰 조회
export const reviewList = async ( storeId ) => {
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new undefinedStoreError("해당 가게가 존재하지 않습니다.", storeId);
  }
  const showList = await storeRepository.showReview(storeId);
  return showList
}