import express from "express";
import { addReviewToStore, showReview } from "../controllers/review.controller.js";

const router = express.Router();

// 리뷰 추가
router.post("/add/:storeId", addReviewToStore);

// 리뷰 조회
router.get("/get/:userId", showReview);

export default router;