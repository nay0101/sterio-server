const Film = require("../models/films");
const Rating = require("../models/ratings");

const stream = async (req, res) => {
  const { film_id } = req.params;

  try {
    const film = await Film.findOne({ _id: film_id });
    if (!film) {
      error = "Error";
      return res.status(200).send({ error });
    }

    const filePath = film.source;
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;

    const range = req.headers.range;
    if (range) {
      const positions = rangeParser(fileSize, range);
      const start = positions[0].start;
      const end = positions[0].end;
      const chunkSize = end - start + 1;
      const stream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        "Content-Type": "video/mp4",
        "Content-Length": chunkSize,
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
      });
      stream.pipe(res);
    } else {
      const stream = fs.createReadStream(filePath);
      res.writeHead(200, {
        "Content-Type": "video/mp4",
        "Content-Length": fileSize,
        "Accept-Ranges": "bytes",
      });
      stream.pipe(res);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

const uploadFilm = async (req, res) => {
  const { film_name, film_description, views, year, tags, director, casts } =
    req.body;
  const file = req.file;
  const source = file.path;
  try {
    const result = await Film.create({
      film_name,
      film_description,
      views,
      year,
      tags,
      director,
      casts,
      source,
    });
    res.status(201).send({ film_id: result._id });
  } catch (err) {
    res.sendStatus(400);
  }
};

const updateFilm = async (req, res) => {
  try {
    const file = req.file;
    if (file) req.body.source = file.path;
    await Film.findByIdAndUpdate(req.params.film_id, req.body);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

const deleteFilm = async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.film_id);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

const rateFilm = async (req, res) => {
  try {
    const { rating } = req.body;
    const film_id = req.params.film_id;
    const user_id = req.user_id;
    const result = await Rating.findOne({ user_id });
    if (result) {
      await Rating.findOneAndUpdate({ user_id }, { rating });
      return res.sendStatus(200);
    }
    await Rating.create({
      user_id,
      film_id,
      rating,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = { stream, uploadFilm, updateFilm, deleteFilm, rateFilm };
