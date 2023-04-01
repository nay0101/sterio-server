const User = require("../models/users");
const Admin = require("../models/admins");

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find({}, "-password");
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const result = await Admin.find({}, "-password");
    res.status(200).json({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const getOneUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    let result = await User.findById(user_id, "-password");
    if (!result) result = await Admin.findById(user_id, "-password");
    res.status(200).send({ result });
  } catch (err) {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    if (!(await User.findByIdAndDelete(user_id)))
      await Admin.findByIdAndDelete(user_id);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};
const updateUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    if (!(await User.findByIdAndUpdate(user_id, req.body)))
      await Admin.findByIdAndUpdate(user_id, req.body);
    res.status(200).end();
  } catch (err) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAllAdmins,
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
};
