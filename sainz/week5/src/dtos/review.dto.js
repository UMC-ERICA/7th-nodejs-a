export const bodyToReview = (body) => {
  return {
    store_id: body.store_id,
    user_id: body.user_id,
    content: body.content,
    rating: body.rating,
    photo: body.photo,
  };
};
