
import { StatusCodes } from "http-status-codes";

//services
import { listStoreMissions, listTryingMyMissions , changeMissionState} from "../services/mission.service.js";

export const handleStoreMissionList = async(req, res, next) =>{
    /*
    #swagger.summary = '가게 미션 조회 API'
    #swagger.responses[200] = {
        $ref: "#/components/missionSchemas/mission_200"
        };
    #swagger.responses[404] = {
        $ref: "#/components/missionSchemas/mission_404"
        };
    #swagger.responses[500] = {
        $ref: "#/components/missionSchemas/mission_500"
        };
    */
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
    /*
    #swagger.summary = '진행중인 미션 조회 API'
    #swagger.responses[200] = {
        $ref: "#/components/missionListSchemas/missionList_200"
        };
    #swagger.responses[500] = {
        $ref: "#/components/missionListSchemas/missionList_500"
        };
    */
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
    /*
    #swagger.summary = '미션 상태 변경 API'
    #swagger.responses[200] = {
        $ref: "#/components/missionListSchemas/changeState_200"
        };
    #swagger.responses[404] = {
        $ref: "#/components/missionListSchemas/changeState_404"
        };
    #swagger.responses[500] = {
        $ref: "#/components/missionListSchemas/changeState_500"
        };
    */
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