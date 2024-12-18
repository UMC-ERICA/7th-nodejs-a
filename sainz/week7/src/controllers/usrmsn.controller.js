import { StatusCodes } from 'http-status-codes';
import { bodyToUserMission } from '../dtos/usrmsn.dto.js';
import { AddUserMission } from '../services/usrmsn.service.js';
//week6
import { ReadMyMission } from '../services/usrmsn.service.js';
import { UpdateMyMission } from '../services/usrmsn.service.js';

export const handleAddUserMission = async (req, res, next) => {
  console.log('진행중에 미션 추가');
  console.log('body:', req.body);

  const usrmsn = await AddUserMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: usrmsn });
};
//week7
export const handleMyMission = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const MyMission = await ReadMyMission(userId);

    if (MyMission.success) {
      res.status(StatusCodes.OK).success(MyMission);
    } else {
      res.status(StatusCodes.NOT_FOUND).error({
        errorCode: error.errorCode,
        reason: error.message,
        data: userId,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const handleUpdateStatus = async (req, res, next) => {
  const userId = req.params.user_id;
  const missionId = req.params.mission_id;
  const MissionStatus = await UpdateMyMission(userId, missionId);

  if (MissionStatus.success) {
    res.status(StatusCodes.OK).json({ result: MissionStatus.data });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ message: MissionStatus.message });
  }
};
