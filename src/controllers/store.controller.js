import { addStoreService } from '../services/store.service.js'; // 서비스 임포트

export const addStore = async (req, res, next) => {
  try {
    const storeData = req.body;
    const newStoreId = await addStoreService(storeData);
    
    res.status(201).json({ message: "가게가 추가되었습니다.", data: newStoreId });
  } catch (error) {
    next(error);
  }
};