const express = require("express");
const {
  register,
  getProfile,
  updateProfile,
} = require("../controllers/user.controller");
const { body } = require("express-validator");
const validators = require("../middlewares/validators");
const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

// đăng ký tài khoản
router.post(
  "/",
  validators.validate([
    body("name", "Invalid Name").exists().notEmpty(),
    body("email", "Invalid Email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid Password").exists().notEmpty(),
  ]),
  register
);
// lấy tài khoản
router.get("/profile", loginRequired, getProfile);

// thay đổi thông tin tài khoản
router.put(
  "/update",
  validators.validate([
    body("name", "Invalid Name").optional().notEmpty(),
    body("email", "Invalid Email")
      .optional()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid Password").optional().notEmpty(),
    body("address", "Invalid Address").optional().notEmpty(),
    body("contact", "Invalid Contact").optional().notEmpty(),
  ]),
  loginRequired,
  updateProfile
);
module.exports = router;
