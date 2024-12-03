// DB 접근
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const updateUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (!user) {
    return null;
  }

  const updatedUser = await prisma.user.update({
    where: { email: data.email },
    data: {
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      number: data.number,
    },
  });

  return updatedUser;
};