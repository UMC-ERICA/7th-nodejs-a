import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { newRestaurant } from "./controllers/restaurant.controller.js";
import { newMission } from "./controllers/mission.controller.js";
import { 
  newReview,
  newMyTryingMission 
} from "./controllers/user.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.post("/restaurant", newRestaurant);
app.post("/my-page/review", newReview);
app.post("/missions", newMission);
app.post("/my-missions", newMyTryingMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});