import express from "express";
import passport from "passport";

import {
  getPostTest,
  getAllPost,
  post2Post,
  getAPost,
  deleteAPost,
  likeAPost,
  removeLikeAPost,
  addCommentAPost,
  removeCommentAPost,
} from "../../controllers/posts.mjs";

const router = express.Router();

// @route GET api/posts/test
// @desc Tests posts routes
// @access Public
router.get("/test", getPostTest);

// @route GET api/posts
// @desc Fetch all posts
// @access Public
router.get("/", getAllPost);

// @route POST api/posts
// @desc Create post
// @access Private
router.post("/", passport.authenticate("jwt", { session: false }), post2Post);

// @route GET api/posts/:post_id
// @desc Fetch a post by id
// @access Public
router.get("/:post_id", getAPost);

// @route DELETE api/posts/:post_id
// @desc Delete a post by id
// @access Private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  deleteAPost
);

// @route POST api/posts/like/:post_id
// @desc  a like to post by id
// @access Private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  likeAPost
);

// @route POST api/posts/unlike/:post_id
// @desc  remove a like to post by id
// @access Private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  removeLikeAPost
);

// @route POST api/posts/comment/:post_id
// @desc  add a comment to post by id
// @access Private
router.post(
  "/comment/:post_id",
  passport.authenticate("jwt", { session: false }),
  addCommentAPost
);

// @route Delete api/posts/comment/:post_id/:comment_id
// @desc  remove a comment to post by id
// @access Private
router.delete(
  "/comment/:post_id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  removeCommentAPost
);

export default router;
