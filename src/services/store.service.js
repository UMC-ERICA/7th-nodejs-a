import * as storeRepository from '../repositories/store.repository.js';
import { StoreDTO } from '../dtos/store.dto.js';

export const addStoreService = async (storeData) => {
  const storeDTO = StoreDTO(storeData);
  const storeId = await storeRepository.createStore(storeDTO);
  return storeId;
}