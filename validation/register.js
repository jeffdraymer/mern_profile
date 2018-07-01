const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmpassword = !isEmpty(data.confirmpassword)
    ? data.confirmpassword
    : "";

  //Name validation
  if (!Validator.isEmpty(data.name)) {
    if (
      !Validator.isLength(data.name, {
        min: 2,
        max: 30
      })
    ) {
      errors.name = "Name must be between 2 and 30 characters";
    }
  } else {
    errors.name = "Please enter your name";
  }
  //email validation
  if (!Validator.isEmpty(data.email)) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Please enter a valid email";
    }
  } else {
    errors.email = "Please enter your email";
  }
  //password validation
  if (!Validator.isEmpty(data.password)) {
    if (
      !Validator.isLength(data.password, {
        min: 6,
        max: 30
      })
    ) {
      errors.password = "Password must be between 6 and 30 characters";
    }
  } else {
    errors.password = "Please enter a password";
  }
  //confrim password validation
  if (!Validator.isEmpty(data.confirmpassword)) {
    if (
      !Validator.isLength(data.confirmpassword, {
        min: 6,
        max: 30
      })
    ) {
      errors.confirmpassword = "Password must be between 6 and 30 characters";
    } else if (!Validator.equals(data.password, data.confirmpassword)) {
      errors.confirmpassword = "Confirm password does not match password";
    }
  } else {
    errors.confirmpassword = "Please enter a confirm password";
  }

  return { errors, isValid: isEmpty(errors) };
};
