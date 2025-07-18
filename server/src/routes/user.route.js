const express = require("express");
const controller = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.post("/logout", controller.logoutUser);
router.get("/check-auth", authenticateToken, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user,
  });
});
// router.post("/send/otp", controller.sendResetPasswordOtp);
// router.post("/reset/password", controller.resetPasswordWithOtp);
// router.put("/update/profile", [authenticateToken], controller.updateProfile);
// router.patch(
//   "/update/password",
//   [authenticateToken],
//   controller.updatePassword
// );
module.exports = router;
