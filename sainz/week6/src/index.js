import cors from 'cors';
import dotenv from 'dotenv';
import express, { application } from 'express';
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddMission } from './controllers/mission.controller.js';
import { handleAddstore } from './controllers/store.controller.js';
import { handleAddReview } from './controllers/review.controller.js';
import { handleAddUserMission } from './controllers/usrmsn.controller.js';
// week6
import { handleListStoreReviews } from './controllers/store.controller.js';
import { handleMyReviewList } from './controllers/review.controller.js';
import { handleStoreMission } from './controllers/store.controller.js';
import { handleMyMission } from './controllers/usrmsn.controller.js';
import { handleUpdateStatus } from './controllers/usrmsn.controller.js';

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
app.get('/api/v1/stores/:storeId/reviews', handleListStoreReviews);
app.get('/api/v1/reviews/:userId', handleMyReviewList);
app.get('/api/v1/mission/:storeId', handleStoreMission);
app.get('/api/v1/missions/:userId', handleMyMission);
app.get('/api/v1/missions/:userId/:missionId', handleUpdateStatus);

app.post('/users/signup', handleUserSignUp);
app.post('/store', handleAddstore);
app.post('/users/review', handleAddReview);
app.post('/store/mission', handleAddMission);
app.post('/users/mission', handleAddUserMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
