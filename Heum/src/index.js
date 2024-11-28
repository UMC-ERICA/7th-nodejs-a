import cors from 'cors'; 
import dotenv from "dotenv";
import express from "express";

//Swagger 세팅
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { handleUserSignUp, handleUserMissionAdd, handleUpdateUser } from './controllers/user.controller.js';
import { newRestaurant, handleReviewPost, handleMissionAdd } from './controllers/restaurant.controller.js';
import { handleMyStoreReviewList } from './controllers/review.controller.js';
import { handleStoreMissionList, handleTringMyMissionList , handleMissionSuccess} from './controllers/mission.controller.js';

import doc from "./swagger.js";

//Session--------------------------------------------------
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";   // 구글 로그인 전략 설정
import { kakaoStrategy } from "./auth.config.js";    // 카카오 로그인 전략 설정
import { prisma } from "./db.config.js";
//---------------------------------------------------------

dotenv.config();

//Session--------------------------------------------------
passport.use(googleStrategy);           // 구글 로그인 전략 설정 추후 다른 로그인 전략 추가 가능
passport.use(kakaoStrategy);            // 카카오 로그인 전략 설정
passport.serializeUser((user, done) => done(null, user));      // 사용자 정보 객체를 세션에 아이디로 저장
passport.deserializeUser((user, done) => done(null, user));    // 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
//----------------------------------------------------------

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

//Session============================================================================
// 세션 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log("req.user:",req.user);
  res.send("Hello World!");
});


//구글 로그인 연동
//session 확인
app.get("/oauth2/login/google", passport.authenticate("google"));

//로그인 성공
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// 세션 데이터 확인
app.get('/session', (req, res) => {
  console.log(req.session); // 세션 데이터 로그
  res.json(req.session);   // 클라이언트에 세션 정보 반환
});

//카카오 로그인 연동
app.get("/oauth2/login/kakao", passport.authenticate("kakao"));

app.get("/oauth2/callback/kakao", passport.authenticate("kakao", {
  failureRedirect: "/oauth2/login/kakao",
  failureMessage: true,
}), (req, res) => res.redirect("/")
);


//====================================================================================

/*
공통 응답을 사용할 수 있는 헬퍼 함수 등록
*/
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

//Swagger 세팅-------------------
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});
//Swagger 세팅-------------------


/*
POST
*/
//회원가입
app.post("/users", handleUserSignUp);

//가게 추가하기
app.post("/restaurants", newRestaurant);

//가게에 리뷰 달기
app.post("/restaurants/reviews", handleReviewPost);

//가게에 미션 추가하기
app.post("/restaurants/mission", handleMissionAdd);

//미션 도전
app.post("/account/mission", handleUserMissionAdd);


/*
GET
*/
//특정 계정이 작성한 리뷰 조회
app.get("/reviews/:userId/:storeId/", handleMyStoreReviewList);

//특정 가게의 미션 조회
app.get("/missions/stores/:storeId", handleStoreMissionList);

//내가 진행 중인 미션 목록
app.get("/missionList/:userId/:state", handleTringMyMissionList);


/*
PATCH
*/
//내가 진행 중인 미션을 진행 완료로 바꾸기
app.patch("/missionList/:userId/:missionId/:state", handleMissionSuccess);

//사용자 정보 수정 라우터
app.patch("/users/:userId", handleUpdateUser);


/*
전역 오류를 처리하기 위한 미들웨어
*/
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});