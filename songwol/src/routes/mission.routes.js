import express from 'express';
import * as missionController from '../controllers/mission.controller.js';

const router = express.Router();

// 가게에 미션 추가하기
router.post('/add/:storeId', missionController.addMissionToStore);

// 특정 가게의 미션 목록 조회
router.get('/get/:storeId', missionController.getStoreMission);

export default router;