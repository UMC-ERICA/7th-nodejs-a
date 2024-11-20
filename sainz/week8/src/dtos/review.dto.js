export const bodyToReview = (body) => {
  return {
    store_id: body.store_id,
    user_id: body.user_id,
    content: body.content,
    rating: body.rating,
    photo: body.photo,
  };
};

// export const responseFromMyReview = (myreview) => {
//   // 리뷰가 없다면, 실패 메시지와 빈 배열 반환
//   if (!myreview || myreview.length === 0) {
//     return {
//       success: false,
//       message: 'No reviews found.',
//       data: [],
//     };
//   }

//   // 리뷰가 있을 경우, 성공 메시지와 리뷰 데이터를 포맷하여 반환
//   return {
//     success: true,
//     message: 'Reviews fetched successfully.',
//     data: myreview.map((review) => ({
//       id: review.id,
//       title: review.title,
//       content: review.content,
//       rating: review.rating,
//       createdAt: review.createdAt,
//     })),
//   };
// };
