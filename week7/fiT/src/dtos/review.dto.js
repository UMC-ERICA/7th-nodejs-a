export const bodyToReview = (body) => {
    const created_date = new Date();
  
    return {
        id: body.id,
        restaurant_id: body.restaurant_id,
        account_id: body.account_id,
        score: parseInt(body.score, 10),
        content: body.content,
        created_date
    };
  };
  
  export const responseFromReview = (review) => {
      return {
        restaurant_id: review.Restaurant_id.toString(),
        account_id: review.account_id,
        score: review.score,
        content: review.content,
        created_date: review.created_date,
        success: true
      };
  };
  