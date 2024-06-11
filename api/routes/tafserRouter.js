import express from "express";
import { getTasfer } from "../controllers/tafserController.js";

const router = express.Router();

router.get("/tafser/:surahNumber/:ayahNumber", getTasfer);

export default router;
