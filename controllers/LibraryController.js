const Library = require("../models/library");

const getLibrary = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await Library.find({ user_id });
    res.status(200).send({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};
const addToLibrary = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { film_id } = req.body;
    await Library.create({
      user_id,
      film_id,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};
const removeFromLibrary = async (req, res) => {
  try {
    await Library.findByIdAndDelete(req.params.library_content_id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = { getLibrary, addToLibrary, removeFromLibrary };
