import { prisma } from "../db.config.js";
import { customError } from "../error.js";
// User 데이터 삽입 
// 입력: 만들 User의 정보들
// 출력: 만들어진 User의 insertId값
export const addUser = async (data) => {
  try{
    const user = await prisma.account.findFirst({ where: { phone: data.phone } });
    if (user) {
      return null;
    }
    const created = await prisma.account.create({data: data});
    return created.xid;
  }catch(err){
    throw new customError("계정 생성 중 오류가 발생했습니다", data, "500");
  }
  
};

// 사용자 정보 얻기
// 입력: userId값
// 출력: 해당하는 유저의 정보
export const getUser = async (userId) => {
  try {
    const user = await prisma.account.findFirst({ where: { xid: userId } });
    return user;
  } catch (error) {
    throw new customError("유저 정보 조회 중 오류가 발생했습니다", userId, "500");
  }
};



