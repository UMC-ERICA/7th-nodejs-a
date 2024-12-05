import { updateUser } from './user.service.js';
import { bodyToUser } from './user.dto.js';
import { StatusCodes } from 'http-status-codes';

export const handleUpdateUser = async (req, res, next) => {
  const userId = req.params.userId; // userId 추출
  const userIdInt = parseInt(userId, 10);
  console.log(userIdInt);
  const update = await updateUser(bodyToUser(req.body, userIdInt)); // 사용자 ID와 함께 업데이트 처리
  res.status(StatusCodes.OK).json({ result: update });
};
