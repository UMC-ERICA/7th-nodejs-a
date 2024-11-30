import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import session from 'express-session';
import passport from 'passport';
import { googleStrategy, naverStrategy } from './auth.config.js';

import { prisma } from './db.config.js';
import { handleUpdateUser } from './user.controller.js';

dotenv.config();

passport.use(googleStrategy);
passport.use(naverStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT;

// 성공 및 실패 응답 처리를 위한 미들웨어
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

app.use(cors()); // CORS 방식 허용
app.use(express.static('public')); // 정적 파일 접근
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식으로 본문 데이터 해석

// 세션 설정 (쿠키 관련 옵션 추가)
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
      httpOnly: true, // 보안을 위해 httpOnly 설정
      secure: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 HTTPS 사용
      sameSite: 'strict', // 동일 출처 정책 적용
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2분마다 세션 체크
      dbRecordIdIsSessionId: true,
    }),
  })
);

app.use(passport.session());

// 기본 경로에서 사용자 정보 확인
app.get('/', (req, res) => {
  console.log('user:', req.user);
  res.send('Hello World!');
});

// 구글 OAuth 로그인
app.get('/oauth2/login/google', passport.authenticate('google'));
app.get(
  '/oauth2/callback/google',
  passport.authenticate('google', {
    failureRedirect: '/oauth2/login/google',
    failureMessage: true,
  }),
  (req, res) => {
    // 인증 후 세션이 제대로 설정된 상태에서 사용자 정보 확인
    console.log('Authenticated user:', req.user);
    return res.redirect('/');
  }
);

//naver
app.get('/oauth2/login/naver', passport.authenticate('naver'));
app.get(
  '/oauth2/callback/naver',
  passport.authenticate('naver', {
    failureRedirect: '/oauth2/login/naver',
    failureMessage: true,
  }),
  (req, res) => {
    console.log('naver  authenticate', req.user);
    return res.redirect('/');
  }
);

//수정
app.patch('/api/v1/users/:userId', handleUpdateUser);
// 전역 오류 처리 미들웨어
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
