export const bodyToRv = (data) =>{
    var create_at = new Date();
    
    return{
        account_xid: data.account_xid,
        restaurant_id: data.restaurant_id,
        title: data.title,
        body: data.body || "",
        rating: data.rating,
        create_at
    };
};