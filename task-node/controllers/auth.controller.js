const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    return res
      .status(201)
      .json({ message: "Profile was created", user: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  const data = { ...req.user.toObject(), _id: req.user._id.toString() };

  return res.status(200).json(data);
};
