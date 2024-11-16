
import { StatusCodes } from "http-status-codes";

//services
import { listStoreMissions, listTryingMyMissions , changeMissionState} from "../services/mission.service.js";



export const handleMyStoreReviewList = async(req, res, next) =>{
    console.log("나의 리뷰 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    const reviews = await listMyStoreReviews(
        parseInt(req.params.userId),
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).success(reviews);
}

export const handleStoreMissionList = async(req, res, next) =>{
    console.log("가게 미션 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    try{
        const missions = await listStoreMissions(
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(missions);
    }catch(err){
        next(err);
    }
}


export const handleTringMyMissionList = async(req, res, next)=>{
    console.log("진행중인 미션 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    try{
        const myMissions = await listTryingMyMissions(
            parseInt(req.params.userId),
            req.params.state,
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(myMissions);
    }catch(err){
        next(err);
    }
}


export const handleMissionSuccess = async(req, res, next)=>{
    console.log("미션 상태 변경을 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    try{
        const mission = await changeMissionState(
            parseInt(req.params.userId),
            parseInt(req.params.missionId),
            req.params.state
        );
        res.status(StatusCodes.OK).success(mission);
    }catch(err){
        next(err);
    }
}