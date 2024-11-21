import cors from 'cors';
import dotenv from 'dotenv';
import express, { application } from 'express';
import { handleUserSignUp } from './controllers/user.controller.js';
import { handleAddMission } from './controllers/mission.controller.js';
import { handleAddstore } from './controllers/store.controller.js';
import { handleAddReview } from './controllers/review.controller.js';
import { handleAddUserMission } from './controllers/usrmsn.controller.js';
// week7
import { handleListStoreReviews } from './controllers/store.controller.js';
import { handleMyReviewList } from './controllers/review.controller.js';
import { handleStoreMission } from './controllers/store.controller.js';
import { handleMyMission } from './controllers/usrmsn.controller.js';
import { handleUpdateStatus } from './controllers/usrmsn.controller.js';
//week 8
import swaggerAutogen from 'swagger-autogen';
import swaggerUiExpress from 'swagger-ui-express';

dotenv.config();

const app = express();
const port = process.env.PORT;

//week7
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: 'SUCCESS', error: null, success });
  };
  res.error = ({ errorCode = 'unknown', reason = null, data = null }) => {
    return res.json({
      resultType: 'FAIL',
      error: { errorCode, reason, data },
      success: null,
    });
  };
  next();
});
app.use(cors()); // cors 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

//week8
app.use(
  '/docs',
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: '/openapi.json',
      },
    }
  )
);

app.get('/openapi.json', async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: '3.0.0',
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = '/dev/null'; // 파일 출력은 사용하지 않습니다.
  const routes = ['./src/index.js'];
  const doc = {
    info: {
      title: 'UMC 7th',
      description: 'UMC 7th Node.js 테스트 프로젝트입니다.',
    },
    host: 'localhost:3000',
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

app.get('/stores/:storeId/reviews', handleListStoreReviews);
//week7
app.get('/reviews/:userId', handleMyReviewList);
app.get('/mission/:storeId', handleStoreMission);
app.get('/missions/:userId', handleMyMission);
app.patch('/missions/:userId/:missionId', handleUpdateStatus);

app.post('/users/signup', handleUserSignUp);
app.post('/store', handleAddstore);
app.post('/users/review', handleAddReview);
app.post('/store/mission', handleAddMission);
app.post('/users/mission', handleAddUserMission);

//week7 전역 오류 처리 미들웨어
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || 'unknown',
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
