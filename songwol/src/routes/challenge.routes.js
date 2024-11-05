import express from 'express';
import * as challengeController from '../controllers/challenge.controller.js';

const router = express.Router();

// 가게의 미션 도전하기
router.post('/:missionId', challengeController.challengeMission);

// 특정 사용자의 미션 중 목록 조회
router.get('/get/:userId', challengeController.getUserMission);

// 미션 진행 완료로 바꾸기
router.patch('/:userId/:missionId/success', challengeController.successMission);

export default router;