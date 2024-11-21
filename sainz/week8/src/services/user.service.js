import { responseFromReviews } from '../dtos/store.dto.js';
import { responseFromUser } from '../dtos/user.dto.js';
// import { responseFromMyReview } from '../dtos/review.dto.js';
import { getMyReviews } from '../repositories/review.repository.js';
//week7
import {
  DuplicateUserEmailError,
  ReviewNotFoundError,
  UserNotFoundError,
} from '../errors.js';

import { prisma } from '../db.config.js';
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from '../repositories/user.repository.js';

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    user_id: data.user_id,
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError('이미 존재하는 이메일입니다.', data);
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const ReadReviews = async (userId) => {
  console.log(userId);
  // userId가 string으로 받아져 이것을 int로 변경해야 find에서 수행 가능
  const userIdInt = parseInt(userId, 10);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { user_id: userIdInt },
    });
    if (!existingUser) {
      throw new UserNotFoundError('user not found', userId);
    }

    // Fetch reviews by user ID
    const reviews = await prisma.review.findMany({
      where: {
        user_id: userIdInt,
      },
    });

    if (reviews.length === 0) {
      throw new ReviewNotFoundError('no review', userId);
    }

    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
