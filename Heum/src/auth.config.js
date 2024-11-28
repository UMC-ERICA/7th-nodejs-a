import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
    
    const user = await prisma.account.findFirst({ where: { email } });
    console.log('Found user:', user);  // 반환된 객체 확인
    if (user !== null) {
      return { xid: user.xid, email: user.email, name: user.name };
    }
  
    const created = await prisma.account.create({
      data: {
        email,
        nickname: "추후 수정",
        name:  profile.displayName,
        phone: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        create_at: new Date(),
        state: "accession",
        point: 0,
        food: "추후 수정",
      },
    });
  
    return { xid: created.xid, email: created.email, name: created.name};
  };

export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
    scope: ["profile_nickname", "account_email"],
    state: true,
  },
  (accessToken, refreshToken, profile, done) => {
    return kakaoVerify(profile)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  }
);

const kakaoVerify = async (profile) => {
  const email = profile._json.kakao_account.email;
  console.log('profile:', profile);  // profile 객체 확인
  if (profile._json.kakao_account.has_email === false) {
    throw new Error(`profile.email was not found: ${profile}`);
  }
  
  const user = await prisma.account.findFirst({ where: { email } });
  console.log('Found user:', user);  // 반환된 객체 확인
  if (user !== null) {
    return { xid: user.xid, email: user.email, name: user.name };
  }

  const created = await prisma.account.create({
    data: {
      email,
      nickname: profile.username,
      name: profile.displayName,
      phone: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      create_at: new Date(),
      state: "accession",
      point: 0,
      food: "추후 수정",
    },
  });

  return { xid: created.xid, email: created.email, name: created.name};
}