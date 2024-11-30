import { updateUserInDatabase } from './user.repository.js';

export const updateUser = async (userData) => {
  try {
    // 데이터베이스에서 사용자 정보 업데이트
    const updatedUser = await updateUserInDatabase(userData);
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user: ' + error.message);
  }
};
