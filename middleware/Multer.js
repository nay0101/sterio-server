const multer = require("multer");
const BASE_STORAGE = "public";

const filmStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${BASE_STORAGE}/videos`);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const filmUpload = multer({ storage: filmStorage });

module.exports = { filmUpload };
