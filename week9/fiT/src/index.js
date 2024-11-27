import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, naverStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import { 
  newRestaurant,
  readmissionOfRestaurant
 } from "./controllers/restaurant.controller.js";
import { newMission } from "./controllers/mission.controller.js";
import { 
  newReview,
  newMyTryingMission, 
  readMyReviewList,
  readMyTryingMissions,
  updateMyTryingMissions,
  updateUserInfo
} from "./controllers/user.controller.js";

dotenv.config();

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
const app = express();
const port = process.env.PORT;

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

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/naver", passport.authenticate("naver"));
app.get(
  "/oauth2/callback/naver",
  passport.authenticate("naver", {
    failureRedirect: "/oauth2/login/naver",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.use(passport.session());

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
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});
app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});
app.get("/myReviews/:user_id", readMyReviewList);
app.get("/missionOfRestaurant/:restaurant_id", readmissionOfRestaurant);
app.get("/my-missions/:user_id", readMyTryingMissions);

app.post("/restaurant", newRestaurant);
app.post("/my-page/review", newReview);
app.post("/missions", newMission);
app.post("/my-missions", newMyTryingMission);
app.patch("/my-missions/:user_id/:mission_id", updateMyTryingMissions);
app.patch("/update-user-info", updateUserInfo);

//처리못한 에러 처리
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});