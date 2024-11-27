import { responseFromReview } from "../dtos/review.dto.js";
import { NotFoundRestaurant } from "../error.js";
import { getRestaurant } from "../repositories/restaurant.repository.js";
import {
    addReview,
    getReview
} from "../repositories/review.repository.js";

export const createReview = async (data) => {
    const checkRestaurantId = await getRestaurant(data.restaurant_id)
    if(!checkRestaurantId){
      throw new NotFoundRestaurant("not found restaurant", null);
    }
  
    const joinReviewId = await addReview({
        id: data.id,
        restaurant_id: data.restaurant_id,
        account_id: data.account_id,
        score: data.score,
        content: data.content,
        created_date: data.created_date
    });
  
    const review = await getReview(joinReviewId);
  
    return responseFromReview(review);
  };