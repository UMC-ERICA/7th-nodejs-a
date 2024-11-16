//repositorys
import { addUser, getUser } from "../repositories/user.repository.js";
import * as er from "../error.js";

export const userSignUp = async (data) => {
  try {
    console.log(data);
    const joinUserId = await addUser(data);
    if (joinUserId === null) {
      throw new er.DuplicateUserPhoneError("이미 등록된 전화번호입니다.", data, 409);
    }
    const user = await getUser(joinUserId);
    return user;
  } catch (err) {
    if (err instanceof er.customError) {
      throw err;
    }
    throw new er.undefinedUserError("회원가입 중 오류가 발생했습니다.", data, 500);
  }
};
