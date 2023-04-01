const User = require("../models/users");
const bcrypt = require("bcrypt");
const MAX_AGE = 1000 * 3600 * 24;

const login = async (req, res) => {
  const { username, password } = req.body;
  const formatted_username = username.toLowerCase();
  let error = "";
  try {
    const user = await User.findOne({ username: formatted_username });
    if (!user) {
      error = "Wrong Username or Password.";
      return res.status(200).send({ error });
    }
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) throw err;
      if (!match) {
        error = "Wrong Username or Password.";
        return res.status(200).send({ error });
      }
      if (match) {
        req.user_id = user._id;
        res.cookie("UID", req.user_id, { maxAge: MAX_AGE });
        res.status(200).send({ user_id: req.user_id });
      }
    });
  } catch (err) {
    res.sendStatus(400);
  }
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const formatted_username = username.toLowerCase();
  const encrypted_password = await bcrypt.hash(password, 12);
  let error;
  try {
    const user = await User.findOne({ username: formatted_username });
    if (user) {
      error = "Username already exists";
      return res.status(200).send({ error });
    }
    const result = await User.create({
      email: email,
      username: formatted_username,
      password: encrypted_password,
    });
    req.user_id = result._id;
    res.cookie("UID", req.user_id, { maxAge: MAX_AGE });
    res.status(201).send({ user_id: req.user_id });
  } catch (err) {
    res.sendStatus(400);
  }
};

const logout = async (req, res) => {
  res.clearCookie("UID");
  res.sendStatus(200);
};

module.exports = { login, signUp, logout };
