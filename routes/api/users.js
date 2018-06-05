const express = require("express");
const router = express.Router();
//Used for setting user avatar
const gravatar = require("gravatar");
//Used for encrypting password
const bcrypt = require("bcryptjs");

//Load User model
const User = require("../../models/User");

// @route /api/users/
// @desc Tests users route
// @access Public
router.get("/", (req, res) => res.json({ message: "Users Works" }));

// @route /api/users/register
// @desc register users route
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //Using gravatar feature to display user avatar if available,
      //else set avatar to default image
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route /api/users/login
// @desc Login User / Return JWT token
// @access Publicn

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find the users email
  User.findOne({ email }).then(user => {
    //Check if a user was returned
    if (!user) {
      return res.status(404).json({ email: "User was not found" });
    }
    //Check passowrd
    bcrypt.compare(password, user.password).then(isMatch => {
      console.log(isMatch);
      if (isMatch) {
        res.json({ message: "Success" });
      } else {
        return res.status(400).json({ message: "Password is incorrect" });
      }
    });
  });
});

module.exports = router;
