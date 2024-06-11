import express from "express";
import {
  getSurahInPages,
  getSurahPage,
} from "../controllers/pageController.js";

const router = express.Router();
router.get("/pages", getSurahInPages);
router.get("/pages/:number", getSurahPage);

export default router;
