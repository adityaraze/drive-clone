import crypto from "crypto";
import ShareLink from "../models/ShareLink.js";
import File from "../models/File.js";

export const createShareLink = async (req, res) => {
  const token = crypto.randomBytes(20).toString("hex");

  const link = await ShareLink.create({
    file: req.params.id,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });

  res.json({
    link: `${process.env.FRONTEND_URL}/shared/${token}`
  });
};

export const accessSharedFile = async (req, res) => {
  const share = await ShareLink.findOne({ token: req.params.token })
    .populate("file");

  if (!share) return res.status(404).json({ message: "Invalid link" });
  if (share.expiresAt < new Date())
    return res.status(403).json({ message: "Link expired" });

  // JWT user required
  if (!req.user)
    return res.status(401).json({ message: "Login required" });

  res.json(share.file);
};
