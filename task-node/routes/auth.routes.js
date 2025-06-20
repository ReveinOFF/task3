const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/login", authController.login);
router.post("/reg", authController.register);
router.get("/profile", authMiddleware.auth, authController.profile);

module.exports = router;
