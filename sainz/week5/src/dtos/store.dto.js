export const bodyToStore = (body) => {
  return {
    store_name: body.store_name,
    category: body.category,
    location: body.location,
  };
};
