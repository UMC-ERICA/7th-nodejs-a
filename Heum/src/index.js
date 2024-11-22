import cors from 'cors'; 
import dotenv from "dotenv";
import express from "express";

//Swagger 세팅
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { handleUserSignUp, handleUserMissionAdd } from './controllers/user.controller.js';
import { newRestaurant, handleReviewPost, handleMissionAdd } from './controllers/restaurant.controller.js';
import { handleMyStoreReviewList } from './controllers/review.controller.js';
import { handleStoreMissionList, handleTringMyMissionList , handleMissionSuccess} from './controllers/mission.controller.js';

import doc from "./swagger.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

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


/*
전역 오류를 처리하기 위한 미들웨어
*/
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