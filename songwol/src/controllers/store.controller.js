import * as storeService from '../services/store.service.js';

export const addStore = async (req, res, next) => {
  try {
    const storeData = req.body;
    const newStoreId = await storeService.addStoreService(storeData);
    
    res.status(201).json({ message: "가게가 추가되었습니다.", data: newStoreId });
  } catch (error) {
    next(error);
  }
};