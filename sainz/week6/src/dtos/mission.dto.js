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
// export const responseFromStoreMission = (storemission) => {
//   // 리뷰가 없다면, 실패 메시지와 빈 배열 반환
//   if (!storemission || storemission.length === 0) {
//     return {
//       success: false,
//       message: 'No mission found.',
//       data: [],
//     };
//   }

//   // 리뷰가 있을 경우, 성공 메시지와 리뷰 데이터를 포맷하여 반환
//   return {
//     success: true,
//     message: 'missions fetched successfully.',
//     data: storemission.map((mission) => ({
//       id: mission.id,
//       points: mission.points,
//       deadline: mission.deadline,
//       createdAt: mission.createdAt,
//     })),
//   };
// };
