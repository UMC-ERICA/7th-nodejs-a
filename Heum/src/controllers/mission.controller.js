
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
    res.status(StatusCodes.OK).json({ success: true, data: reviews });
}

export const handleStoreMissionList = async(req, res, next) =>{
    console.log("가게 미션 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    const missions = await listStoreMissions(
        parseInt(req.params.storeId),
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ success: true, data: missions });
}


export const handleTringMyMissionList = async(req, res, next)=>{
    console.log("진행중인 미션 조회를 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    const myMissions = await listTryingMyMissions(
        parseInt(req.params.userId),
        req.params.state,
        typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
    );
    res.status(StatusCodes.OK).json({ success: true, data: myMissions });
}

export const handleMissionSuccess = async(req, res, next)=>{
    console.log("미션 상태 변경을 요청했습니다!");
    console.log("body:", req.body, "\nparams:", req.params, "\nquery:", req.query);

    const mission = await changeMissionState(
        parseInt(req.params.userId),
        parseInt(req.params.missionId),
        req.params.state
    );
    res.status(StatusCodes.OK).json({ success: true, data: mission });
}