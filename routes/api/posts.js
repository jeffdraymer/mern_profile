const express = require("express");
const router = express.Router();

// @route /api/posts/
// @desc Tests post route
// @access Public
router.get("/", (req, res) => res.json({ message: "posts Works" }));

module.exports = router;
