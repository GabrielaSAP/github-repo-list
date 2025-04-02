import express, { Router } from "express";
import {
  redirectToGitHub,
  githubCallback,
  getUserInfo,
} from "../controllers/authController";
import { authenticate } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/github", redirectToGitHub);
router.get("/github/callback", githubCallback);
router.get("/user", authenticate, getUserInfo);

export default router;
