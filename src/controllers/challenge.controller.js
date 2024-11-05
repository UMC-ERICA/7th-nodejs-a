import { findMissionById } from '../repositories/mission.repository.js';
import { findChallengeByUserAndMission, createChallenge } from '../repositories/challenge.repository.js';

export const challengeMission = async (req, res, next) => {
  try {
    const { missionId } = req.params;
    const { userId } = req.body;

    // 미션 존재 여부 확인
    const mission = await findMissionById(missionId);
    if (!mission) {
      return res.status(404).json({ message: "해당 미션이 존재하지 않습니다." });
    }

    // 이미 도전 중인지 확인
    const existingChallenge = await findChallengeByUserAndMission(userId, missionId);
    if (existingChallenge) {
      return res.status(409).json({ message: "이미 도전 중인 미션입니다." });
    }

    // 새로운 도전 생성
    const newChallengeId = await createChallenge(userId, missionId);
    if (!newChallengeId) {
      return res.status(500).json({ message: "미션 도전 중 문제가 발생했습니다." });
    }

    res.status(201).json({ message: "미션 도전 추가에 성공했습니다.", challengeId: newChallengeId });
  } catch (error) {
    next(error);
  }
};