import express from 'express';
import * as missionController from '../controllers/mission.controller.js';

const router = express.Router();

// 가게에 미션 추가하기
router.post('/add/:storeId', missionController.addMissionToStore);

// 특정 가게의 미션 목록 조회
router.get('/get/:storeId', missionController.getStoreMission);

// 가게의 미션 도전하기0
router.post('/:missionId', missionController.challengeMission);

// 특정 사용자의 미션 중 목록 조회
router.get('/get/:userId', missionController.getUserMission);

// 미션 진행 완료로 바꾸기
router.patch('/:userId/:missionId/success', missionController.successMission);

export default router;