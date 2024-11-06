import { prisma } from "../db.config.js";

// User 데이터 삽입 
// 입력: 만들 User의 정보들
// 출력: 만들어진 User의 insertId값
export const addUser = async (data) => {
  const user = await prisma.account.findFirst({ where: { phone: data.phone } });
  if (user) {
    return null;
  }

  const created = await prisma.account.create({ data: data});
  return created.xid;
};

// 사용자 정보 얻기
// 입력: userId값
// 출력: 해당하는 유저의 정보
export const getUser = async (userId) => {
  try {
    console.log(userId);
    const user = await prisma.account.findFirst({ where: { xid: userId } });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Could not fetch user");
  }
};



