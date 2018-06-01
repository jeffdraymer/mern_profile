const express = require("express");
const router = express.Router();

// @route /api/users/
// @desc Tests users route
// @access Public
router.get("/", (req, res) => res.json({ message: "Users Works" }));

module.exports = router;
