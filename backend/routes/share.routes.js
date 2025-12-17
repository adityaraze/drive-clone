import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  createShareLink,
  accessSharedFile
} from "../controllers/share.controller.js";

const router = express.Router();

router.post("/:id", auth, createShareLink);
router.get("/access/:token", auth, accessSharedFile);

export default router;
