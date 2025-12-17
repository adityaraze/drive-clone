import multer from "multer";

const allowedTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "text/csv"
];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (!allowedTypes.includes(file.mimetype)) {
    cb(new Error("Invalid file type"));
  } else {
    cb(null, true);
  }
};

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});
