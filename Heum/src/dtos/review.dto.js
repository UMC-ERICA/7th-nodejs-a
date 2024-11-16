export const bodyToRv = (body) => {
    var create_at = new Date();

    return {
        account_xid: body.account_xid, // body에서 account_xid를 가져오기
        restaurant_id: body.restaurant_id, // body에서 restaurant_id를 가져오기
        title: body.title,
        body: body.body,
        rating: body.rating,
        create_at
    };
};


export const responseFromReviews = (reviews)=>{
    return{
        data: reviews,
        pagination: {
            cursor: reviews.length ? reviews[reviews.length - 1].id : null
        }
    };
};