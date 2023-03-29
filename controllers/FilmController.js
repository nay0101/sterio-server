const Film = require("../models/films");

const stream = async (res, req) => {
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

module.exports = { stream };
