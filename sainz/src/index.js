import cors from 'cors';
import dotenv from 'dotenv';
import express, { application } from 'express';
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddMission } from './controllers/mission.controller.js';
import { handleAddstore } from './controllers/store.controller.js';
import { handleAddReview } from './controllers/review.controller.js';
import { handleAddUserMission } from './controllers/usrmsn.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/users/signup', handleUserSignUp);
app.post('/store', handleAddstore);
app.post('/users/review', handleAddReview);
app.post('/store/mission', handleAddMission);
app.post('/users/mission', handleAddUserMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
