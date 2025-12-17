import express from "express";
import auth from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  uploadFiles,
  getFiles,
  shareWithUser
} from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload", auth, upload.array("file"), uploadFiles);
router.get("/", auth, getFiles);
router.post("/share/user/:id", auth, shareWithUser);

export default router;
