import express from 'express';
import { addMissionToStore } from '../controllers/mission.controller.js';

const router = express.Router();

// 가게에 미션 추가하기
router.post('/:storeId', addMissionToStore);

export default router;