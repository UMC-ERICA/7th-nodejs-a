//repositorys
import { addUser, getUser } from "../repositories/user.repository.js";


export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    nickname: data.nickname,
    create_at: data.create_at,
    name: data.name,
    phone: data.phone,
    birth: data.birth,
    address: data.address,
    state: data.state,
    point: data.point,
    food: data.food
  });
  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }
  const user = await getUser(joinUserId);
  return user;
};
