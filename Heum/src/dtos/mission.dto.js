export const bodyToMisson = (body) =>{
    const deadline = new Date(body.deadline);

    return{
        title: body.title,
        content: body.content,
        point: body.point,
        restaurant_id: body.restaurant_id || "",
        deadline
    };
};

export const bodyToTryingMission = (body)=>{
    const create_at = new Date();
    return{
        account_xid: body.account_xid,
        mission_id: body.mission_id,
        state: body.state || "trying",
        create_at
    };
};