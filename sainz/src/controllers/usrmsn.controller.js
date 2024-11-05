import { StatusCodes } from 'http-status-codes';
import { bodyToUserMission } from '../dtos/usrmsn.dto.js';
import { AddUserMission } from '../services/usrmsn.service.js';

export const handleAddUserMission = async (req, res, next) => {
  console.log('진행중에 미션 추가');
  console.log('body:', req.body);

  const usrmsn = await AddUserMission(bodyToUserMission(req.body));
  res.status(StatusCodes.OK).json({ result: usrmsn });
};
