export const bodyToRestuarnt = (body) => {
    const created_date = new Date();
  
    return {
      restaurant_name: body.name,
      address: body.address,
      type: body.type || "",
      created_date,
      phone_number: body.phone_number || "",
    };
};

export const responseFromRestaurant = (restaurant) => {
   return {
      restaurant_name: restaurant.restaurant_name,
      address: restaurant.address,
      type: restaurant.type || "",
      create_date: restaurant.create_date,
      phone_number: restaurant.phone_number || "",
      success: true
    };
};

