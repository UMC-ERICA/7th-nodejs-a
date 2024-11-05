import express from 'express';
import { challengeMission } from '../controllers/challenge.controller.js';

const router = express.Router();

// 가게의 미션 도전하기
router.post('/:missionId', challengeMission);

export default router;