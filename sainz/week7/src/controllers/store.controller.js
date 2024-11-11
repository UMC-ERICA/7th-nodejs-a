import { StatusCodes } from 'http-status-codes';
import { bodyToStore } from '../dtos/store.dto.js';
import { addnewstore } from '../services/store.service.js';
import { listStoreReviews } from '../services/store.service.js';
import { Readmission } from '../services/mission.service.js';

export const handleAddstore = async (req, res, next) => {
  console.log('상점 추가');
  console.log('body:', req.body);

  const store = await addnewstore(bodyToStore(req.body));
  res.status(StatusCodes.OK).json({ result: store });
};
export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

//week7 mission
export const handleStoreMission = async (req, res, next) => {
  try {
    const storeId = req.params.storeId;
    const Storemission = await Readmission(storeId);

    if (Storemission.success) {
      res.status(StatusCodes.OK).success(Storemission);
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
