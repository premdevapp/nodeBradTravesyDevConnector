import express from "express";
import passport from "passport";

import {
  getUserTest,
  postUserRegister,
  postUserLogin,
  getCurrentUser,
} from "../../controllers/users.mjs";

const router = express.Router();

// @route GET api/users/test
// @desc Tests users routes
// @access Public
router.get("/test", getUserTest);

// @route Post api/users/register
// @desc registeration users routes
// @access Public
router.post("/register", postUserRegister);

// @route Post api/users/login
// @desc login users routes / returning JWTtoken
// @access Public
router.post("/login", postUserLogin);

// @route GET api/users/current
// @desc return current user
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
);

export default router;
