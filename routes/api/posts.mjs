import express from "express";

import { getPostTest } from "../../controllers/posts.mjs";

const router = express.Router();

// @route GET api/posts/test
// @desc Tests posts routes
// @access Public
router.get("/test", getPostTest);

export default router;
