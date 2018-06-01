const express = require("express");
const router = express.Router();

// @route /api/profile/
// @desc Tests profile route
// @access Public
router.get("/", (req, res) => res.json({ message: "Profile Works" }));

module.exports = router;
