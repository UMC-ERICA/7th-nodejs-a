//데이터 관리
export const bodyToUser = (body) => {
     return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth: body.birth,
      address: body.address,
      number: body.number,
    };
};