import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/store.dto.js';
import { addnewstore } from '../services/store.service.js';

export const handleAddstore = async (req, res, next) => {
  console.log('상점 추가');
  console.log('body:', req.body);

  const store = await addnewstore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
