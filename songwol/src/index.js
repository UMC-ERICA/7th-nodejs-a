import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/users.routes.js";
import reviewRoute from "./routes/review.routes.js";
import storeRoute from "./routes/store.routes.js";
import missionRoute from "./routes/mission.routes.js";
import challengeRoute from "./routes/challenge.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

const API = "/api/v1";

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(`${API}/users`, userRoute);
app.use(`${API}/store`, storeRoute);
app.use(`${API}/mission`, missionRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});