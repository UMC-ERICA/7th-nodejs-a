import express from "express";
import { addReviewToStore } from "../controllers/review.controller.js";

const router = express.Router();

// 리뷰 추가
router.post("/:storeId", addReviewToStore);

export default router;