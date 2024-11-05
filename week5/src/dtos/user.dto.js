export const bodyToMyTryingMission = (body)=>{
    return{
        account_id: body.account_id,
        mission_id: body.mission_id,
        state: body.state || "ongoing",
    };
};

export const responseFromMyTryingMission = (myTryingMission) => {
    return {
        account_id: myTryingMission.account_id,
        mission_id: myTryingMission.mission_id,
        state: myTryingMission.state,
    };
};