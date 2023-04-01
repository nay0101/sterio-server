const express = require("express");
const router = express.Router();
const { filmUpload } = require("../middleware/Multer");
const film = require("../controllers/FilmController");

router.get("/:film_id", film.stream);
router.post("/uploadFilm", filmUpload.single("film_source"), film.updateFilm);
router.put("/:film_id", filmUpload.single("film_source"), film.updateFilm);
router.delete("/:film_id", film.deleteFilm);
router.post("/:film/rate", film.rateFilm);

module.exports = router;
