import express from "express";
import passport from "passport";

import {
  getProfileTest,
  getMe,
  postMe,
  getProfileAll,
  getProfileHandle,
  getProfileUserId,
  addExp,
  addEdu,
  removeExp,
  removeEdu,
  removeProfile,
} from "../../controllers/profile.mjs";

const router = express.Router();

// @route GET api/profile/test
// @desc Tests profile routes
// @access Public
router.get("/test", getProfileTest);

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/", passport.authenticate("jwt", { session: false }), getMe);

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post("/", passport.authenticate("jwt", { session: false }), postMe);

// @route    GET api/profile/all
// @desc     Get all profiles
// @access   Public
router.get("/all", getProfileAll);

// @route    GET api/profile/handle/:handle
// @desc     Get profile by handle
// @access   Public
router.get("/handle/:handle", getProfileHandle);

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", getProfileUserId);

// @route    POST api/profile/experience
// @desc     Add profile experience
// @access   Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  addExp
);

// @route    POST api/profile/education
// @desc     Add profile education
// @access   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  addEdu
);

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  removeExp
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  removeEdu
);

// @route    DELETE api/profile/
// @desc     Delete user and profile
// @access   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  removeProfile
);

export default router;
