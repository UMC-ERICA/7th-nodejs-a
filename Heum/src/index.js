import cors from 'cors'; //이 줄 추가하고 ReferenceError: cors is not defined 오류 해결
import dotenv from "dotenv";
import express from "express";

import { handleUserSignUp, handleUserMissionAdd } from './controllers/user.controller.js';
import { newRestaurant, handleReviewPost, handleMissionAdd } from './controllers/restaurant.controller.js';
import { handleMyStoreReviewList } from './controllers/review.controller.js';
import { handleStoreMissionList, handleTringMyMissionList , handleMissionSuccess} from './controllers/mission.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.get("/", (req, res) => {
  res.send("Hello World!");
});

/*
POST
*/
//회원가입
app.post("/users", handleUserSignUp);

//가게 추가하기
app.post("/restaurant", newRestaurant);

//가게에 리뷰 달기
app.post("/restaurant/review", handleReviewPost);

//가게에 미션 추가하기
app.post("/restaurant/mission", handleMissionAdd);

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




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});