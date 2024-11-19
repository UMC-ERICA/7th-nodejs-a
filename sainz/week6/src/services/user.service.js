import { responseFromReviews } from '../dtos/store.dto.js';
import { responseFromUser } from '../dtos/user.dto.js';
// import { responseFromMyReview } from '../dtos/review.dto.js';
import { getMyReviews } from '../repositories/review.repository.js';

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from '../repositories/user.repository.js';

export const userSignUp = async (body) => {
  const joinUserId = getMyReviews(body);

  if (joinUserId === null) {
    throw new Error('이미 존재하는 이메일');
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};
