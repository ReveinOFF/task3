const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });

  return token;
};

exports.register = async ({ email, password, name, job, about }) => {
  const user = await User.findOne({ email });
  if (user) throw new Error("Email already exists");

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    name,
    job,
    about,
    password: hashedPass,
  });

  return {
    id: newUser._id,
    email: newUser.email,
  };
};
