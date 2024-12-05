import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as NaverStrategy } from 'passport-naver';
// import { Strategy as KakaoStrategy } from 'passport-kakao'; // passport-kakao 임포트
import { prisma } from './db.config.js';

dotenv.config();

// 구글 인증 전략 설정
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/oauth2/callback/google',
    scope: ['email', 'profile'],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);
// 네이버 인증 전략 설정
export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/oauth2/callback/naver',
    scope: ['email', 'profile'],
  },
  (accessToken, refreshToken, profile, cb) => {
    return naverVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

// 네이버 인증 후 사용자 처리 함수
const naverVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const name = profile.displayName || profile._json.properties.nickname;
  if (!name) {
    throw new Error(`profile.name was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.user_id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name,
      gender: '추후 수정',
      birth: new Date(2001, 2, 1),
      address: '추후 수정',
      detailAddress: '추후 수정',
      phoneNumber: '추후 수정',
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// // 카카오 인증 전략 설정
// export const kakaoStrategy = new KakaoStrategy(
//   {
//     clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
//     // clientSecret: process.env.PASSPORT_KAKAO_CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/oauth2/callback/kakao',
//   },
//   (accessToken, refreshToken, profile, cb) => {
//     return kakaoVerify(profile)
//       .then((user) => cb(null, user))
//       .catch((err) => cb(err));
//   }
// );

// 구글 인증 후 사용자 처리 함수
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.user_id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: '추후 수정',
      birth: new Date(2001, 2, 1),
      address: '추후 수정',
      detailAddress: '추후 수정',
      phoneNumber: '추후 수정',
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// // 카카오 인증 후 사용자 처리 함수
// const kakaoVerify = async (profile) => {
//   console.log('Kakao Profile:', profile); // 프로필 정보 출력하여 확인

//   // 카카오 계정의 프로필 정보에서 nickname 가져오기
//   const nickname = profile._json.properties.nickname;
//   if (!nickname) {
//     throw new Error(`profile.nickname was not found: ${profile}`);
//   }

//   // 카카오 ID로 사용자 찾기
//   const kakaoId = profile.id;

//   const user = await prisma.user.findFirst({ where: { kakaoId } });
//   if (user !== null) {
//     return { id: user.user_id, name: user.name };
//   }

//   const created = await prisma.user.create({
//     data: {
//       email: 'kakao@googleStrategy.com', // 이메일이 없다면 임시 이메일 사용
//       name: nickname,
//       gender: '추후 수정',
//       birth: new Date(2001, 2, 1),
//       address: '추후 수정',
//       detailAddress: '추후 수정',
//       phoneNumber: '추후 수정',
//       kakaoId, // 카카오 id 저장
//     },
//   });

//   return { id: created.id, email: created.email, name: created.name };
// };
