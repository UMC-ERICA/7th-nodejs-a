import express from 'express';
import { addStore } from '../controllers/store.controller.js';

const router = express.Router();

// 특정 지역에 가게 추가하기
router.post('/', addStore);

export default router;