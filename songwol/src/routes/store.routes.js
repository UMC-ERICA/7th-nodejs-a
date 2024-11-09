import express from 'express';
import { addStore } from '../controllers/store.controller.js';

const router = express.Router();

// 특정 지역에 가게 추가하기
router.post('/', addStore);

// 리뷰 추가
router.post("/add/:storeId", addReviewToStore);

// 리뷰 조회
router.get("/get/:userId", showReview);

export default router;