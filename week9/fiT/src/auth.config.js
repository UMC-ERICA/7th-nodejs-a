import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver-v2";
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

export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.PASSPORT_NAVER_CLIENT_ID,  
      clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET, 
      callbackURL: "http://localhost:3000/oauth2/callback/naver",
      scope: ["profile", "email"],
    },
    (accessToken, refreshToken, profile, cb) => {
      return naverVerify(profile)
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
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }

    const idFromEmail = email.split('@')[0];
  
    const created = await prisma.account.create({
      data: {
        id: idFromEmail,       //id값을 강제적으로 넣어야 하는데 이러면 이메일 로그인과 일반 로그인이 분리가 안되는 듯함. 이러면 유저 고유번호를 primary key로 지정하고 자동 증가를 박아야 하나?
        password: "*@&!1234",  //password도 강제로 넣게 하는건 안 거는게 좋을 듯 싶다.
        email,
        name: profile.displayName,
        gender: 0,
        birthday: new Date(1970, 0, 1),
        address: "추후 수정",
        nickname: "추후 수정",
        phone_number: "추후 수정",
        status: "추후 수정",
        created_date: new Date(),
        savepoint: 0,
        location_O: 2,
        marketing_O: 2,
        event_reception: 2,
        review_reception: 2,
        inquiry_reception: 2,
        korean_food: 2,
        japan_food: 2,
        china_food: 2,
        western_food: 2,
        chicken: 2,
        snack_food: 2,
        meat: 2,
        lunchbox: 2,
        LNS: 2,
        fastfood: 2,
        dessert: 2,
        asian_food: 2
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };

const naverVerify = async (profile) => {
    const email = profile.email;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.account.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }

    const idFromEmail = email.split('@')[0];

    const created = await prisma.account.create({
      data: {
        id: idFromEmail,  
        password: "*@&!1234", 
        email,
        name: profile.name,
        gender: 0,
        birthday: new Date(1970, 0, 1),
        address: "추후 수정",
        nickname: "추후 수정",
        phone_number: "추후 수정",
        status: "추후 수정",
        created_date: new Date(),
        savepoint: 0,
        location_O: 2,
        marketing_O: 2,
        event_reception: 2,
        review_reception: 2,
        inquiry_reception: 2,
        korean_food: 2,
        japan_food: 2,
        china_food: 2,
        western_food: 2,
        chicken: 2,
        snack_food: 2,
        meat: 2,
        lunchbox: 2,
        LNS: 2,
        fastfood: 2,
        dessert: 2,
        asian_food: 2,
      },
    });

    return { id: created.id, email: created.email, name: created.name };
};