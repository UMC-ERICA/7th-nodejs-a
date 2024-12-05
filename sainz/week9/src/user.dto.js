export const bodyToUser = (body, userId) => {
  const birth = new Date(body.birth);

  return {
    user_id: userId,
    email: body.email,
    name: body.name,
    gender: body.gender,
    birth,
    address: body.address || '',
    detailAddress: body.detailAddress || '',
    phoneNumber: body.phoneNumber,
  };
};
