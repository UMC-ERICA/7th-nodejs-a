export const bodyToReview = (body) => {
    const create_at = new Date();
  
    return {
        restaurant_id: body.restaurant_id,
        account_id: body.account_id,
        score: body.score,
        content: body.content,
        create_at
    };
  };
  
  export const responseFromReview = (review) => {
      return {
        restaurant_id: review.restaurant_id,
        account_id: review.account_id,
        score: review.score,
        content: review.content,
        create_at: review.create_at
      };
  };
  