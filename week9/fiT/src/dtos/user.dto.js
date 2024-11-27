export const bodyToMyTryingMission = (body)=>{
    return{
        account_id: body.account_id,
        mission_id: body.mission_id,
        success: body.success
    };
};

export const responseFromMyTryingMission = (myTryingMission) => {
    return {
        account_id: myTryingMission.Account_id,
        mission_id: myTryingMission.Mission_id.toString(),
        success: myTryingMission.success,
        success_boolean: true,
    };
};