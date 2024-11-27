import express from "express";
import { handleUserSignUp, modifyUserInfo } from "../controllers/user.controller.js";

const router = express.Router();

// 사용자 회원가입
router.post("/signup", handleUserSignUp);

// 사용자 정보 수정
router.patch("/modify", modifyUserInfo)

export default router;