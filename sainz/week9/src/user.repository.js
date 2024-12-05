import { prisma } from './db.config.js';

export const updateUserInDatabase = async (userData) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        user_id: userData.user_id,
      },
      data: {
        name: userData.name,
        gender: userData.gender,
        birth: userData.birth,
        address: userData.address,
        detailAddress: userData.detailAddress,
        phoneNumber: userData.phoneNumber,
        preferences: userData.preferences,
      },
    });

    return updatedUser;
  } catch (error) {
    throw new Error('Database error: ' + error.message);
  }
};
