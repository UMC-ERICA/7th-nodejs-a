export const bodyToStore = (body) => {
  return {
    title: body.title,
    content: body.content,
    points: body.points,
    store_id: body.store_id,
    deadline: body.deadline,
  };
};

export const responseFromStore = ({ store }) => {
  if (!store) {
    return { message: '저장된 상점이 없습니다.' }; // 저장된 상점이 없을 때의 처리
  }

  return {
    id: store.id,
    title: store.title,
    content: store.content,
    points: store.points,
    deadline: store.deadline,
    createdAt: store.created_at, // 필요한 다른 속성 추가
  };
};
