import * as challengeService from "../services/challenge.service.js";

export const challengeMission = async (req, res, next) => {
  try {
    const missionId = parseInt(req.params.missionId, 10);
    const { userId } = req.body;
    
    // 도전 수행
    const newChallengeId = await challengeService.challengeMission(userId, missionId);

    res.status(201).json({
      message: "미션 도전 추가에 성공했습니다.",
      challengeId: newChallengeId,
    });
  } catch (error) {
    if (error.message === "해당 미션이 존재하지 않습니다.") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "이미 도전 중인 미션입니다.") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "미션 도전 중 문제가 발생했습니다." });
  }
};

export const getUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missions = await challengeService.userMissionList(userId);
    res.status(201).json({ userId: userId, missions });
  } catch (error) {
    next(error);
  }
}

export const successMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    const missions = await challengeService.userMissionSuccess(userId, missionId);
    res.status(201).json({ missions, message: "미션 완료 처리에 성공했습니다." });
  } catch (error) {
    next(error);
  }
}