export const bodyToRestuarnt = (body) => {
    const create_at = new Date();
  
    return {
      name: body.name,
      address: body.address,
      type: body.type || "",
      create_at,
      phone_number: body.phone_number || "",
    };
};

export const responseFromRestaurant = (restaurant) => {
   return {
      name: restaurant.name,
      address: restaurant.address,
      type: restaurant.type || "",
      create_at: restaurant.create_at,
      phone_number: restaurant.phone_number || ""
    };
};

