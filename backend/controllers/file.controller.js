import File from "../models/File.js";
import User from "../models/User.js";

export const uploadFiles = async (req, res) => {
  const files = req.files.map(f => ({
    owner: req.user.id,
    originalName: f.originalname,
    filename: f.filename,
    mimetype: f.mimetype,
    size: f.size
  }));

  const saved = await File.insertMany(files);
  res.json(saved);
};

export const getFiles = async (req, res) => {
  const files = await File.find({
    $or: [
      { owner: req.user.id },
      { sharedWith: req.user.id }
    ]
  }).sort({ createdAt: -1 });

  res.json(files);
};

export const shareWithUser = async (req, res) => {
  const { email } = req.body;
  const file = await File.findById(req.params.id);

  if (!file) return res.status(404).json({ message: "File not found" });

  if (file.owner.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only owner can share" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!file.sharedWith.includes(user._id)) {
    file.sharedWith.push(user._id);
    await file.save();
  }

  res.json({ message: "File shared with user" });
};
