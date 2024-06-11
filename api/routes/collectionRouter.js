import express from "express";
import {
  createCollection,
  deleteCollection,
  getCollection,
  getUserCollections,
  updateCollection,
} from "../controllers/collectionController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/collections/create", createCollection);
router.get("/collections/:userID", authenticateToken, getUserCollections);
router.get("/collection/:collectionID", authenticateToken, getCollection);
router.delete(
  "/collection/delete/:collectionID",
  authenticateToken,
  deleteCollection
);
router.put(
  "/collection/update/:collectionID",
  authenticateToken,
  updateCollection
);

export default router;
