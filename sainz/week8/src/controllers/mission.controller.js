import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/mission.dto.js';
import { StoreAddMission } from '../services/mission.service.js';

export const handleAddMission = async (req, res, next) => {
  console.log('상점미션추가');
  console.log('body:', req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const store = await StoreAddMission(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
