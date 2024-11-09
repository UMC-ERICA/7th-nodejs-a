import { responseFromReviews } from '../dtos/store.dto.js';
import { responseFromUser } from '../dtos/user.dto.js';
// import { responseFromMyReview } from '../dtos/review.dto.js';
import { getMyReviews } from '../repositories/review.repository.js';
import { prisma } from '../db.config.js';
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from '../repositories/user.repository.js';

export const userSignUp = async (data) => {
  const userId = '1';
  const joinUserId = await addUser({
    user_id: userId,
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error('이미 존재하는 이메일입니다.');
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const ReadReviews = async (userId) => {
  try {
    // 유저 ID를 기준으로 리뷰 리스트 가져오기
    const reviews = await prisma.review.findMany({
      where: {
        user_id: userId,
      },
    });

    // 리뷰가 없다면 빈 배열 반환
    if (reviews.length === 0) {
      return {
        success: false,
        message: 'No reviews found.',
      };
    }
    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      message: 'Error fetching reviews.',
    };
  }
};
