import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { bodyToMyTryingMission } from "../dtos/user.dto.js";
import { createMyTryingMission } from "../services/user.service.js";
import { createReview } from "../services/review.service.js";
import { readReviews} from "../services/user.service.js";
import { findMyTryingMissions } from '../services/user.service.js';

export const newReview = async (req, res, next) => {
    try {
      const review = await createReview(bodyToReview(req.body));
      if (review.success)
          res.status(StatusCodes.OK).success(review);
      else{
          res.status(404).error({
              errorCode: err.errorCode,
              reason: err.message,
              data: err.data
          });
      }
    } catch(error){
      next(error);
    }
};

export const newMyTryingMission = async (req, res, next) => {
  try{
    const mission = await createMyTryingMission(bodyToMyTryingMission(req.body));
    if (mission.success_boolean){
      res.status(StatusCodes.OK).success(mission);
    }
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  } catch(error) {
    next(error);
  }
};

export const readMyReviewList = async (req, res, next) => {
    const userId = req.params.user_id;
    
    try {
      const result = await readReviews(userId);
      if (result.success){
        const response = JSON.parse(  //Bigint return 문제 해결위한 코드
          JSON.stringify(result.data, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value)
        );
        res.status(StatusCodes.OK).success(response);
      }
      else{
        res.status(404).error({
            errorCode: err.errorCode,
            reason: err.message,
            data: err.data
        });
    }
  } catch(error){
    next(error);
  }
};

export const readMyTryingMissions = async (req, res, next) => {
    const userId = req.params.user_id; 
    try{
      const result = await findMyTryingMissions(userId);

      if (result.success) {
        const response = JSON.parse(
          JSON.stringify(result.data, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value)
        )
        res.status(StatusCodes.OK).success(response);
      } 
      else{
        res.status(404).error({
          errorCode: err.errorCode,
          reason: err.message,
          data: err.data
        });
      }
    }
    catch(error) {
      next(error)
    }
};