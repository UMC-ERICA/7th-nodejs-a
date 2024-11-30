import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { prisma } from "./db.config.js";

dotenv.config();

// 구글
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
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: true,
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        number: "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
};

// 카카오
export const kakaoStrategy = new KakaoStrategy(
    {
      clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
      callbackURL: 'http://localhost:3000/oauth2/callback/kakao',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await kakaoVerify(profile);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
);

const kakaoVerify = async (profile) => {
    const kakaoId = profile.id;
    const email = profile._json?.kakao_account?.email;
    const nickname = profile._json?.kakao_account?.profile?.nickname || null;
  
    if (!kakaoId) {
      throw new Error(`Kakao profile is missing an ID: ${JSON.stringify(profile)}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
    
    const created = await prisma.user.create({
        data: {
        email,
        name: nickname,
        gender: true,
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        number: "추후 수정",
        },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };