//데이터 관리
export const bodyToUser = (body) => {
     return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth: new Date(body.birth),
      address: body.address,
      number: body.number,
      points: body.points || 0,
    };
};

export const responseFromUser = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
  };
};