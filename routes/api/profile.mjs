import express from "express";

import { getProfileTest } from "../../controllers/profile.mjs";

const router = express.Router();

// @route GET api/profile/test
// @desc Tests profile routes
// @access Public
router.get("/test", getProfileTest);

export default router;
