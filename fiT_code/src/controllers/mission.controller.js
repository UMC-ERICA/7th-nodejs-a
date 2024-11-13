import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const newMission = async (req, res, next) => {
  try{
    const mission = await createMission(bodyToMission(req.body));
    if(mission.success)
      res.status(StatusCodes.OK).success(mission);
    else{
      res.status(404).error({
        errorCode: err.errorCode,
        reason: err.message,
        data: err.data
      });
    }
  }
  catch(error){
    next(error);
  }
};