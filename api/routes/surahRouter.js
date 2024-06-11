import express from "express";
import {
  getSurah,
  getSurahBysearchQuery,
  getSurahs,
  getSurahsNames,
} from "../controllers/surahController.js";

const router = express.Router();

router.get("/surahs", getSurahs);
router.get("/surahs/search/:searchQuery", getSurahBysearchQuery);
router.get("/surahs/names", getSurahsNames);
router.get("/surahs/:number", getSurah);

export default router;
