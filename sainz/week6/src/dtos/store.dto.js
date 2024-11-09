export const bodyToStore = (body) => {
  return {
    store_name: body.store_name,
    category: body.category,
    location: body.location,
  };
};
export const responseFromReviews = (reviews) => {
  return {
    data: reviews,
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null,
    },
  };
};
