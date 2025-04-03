const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required.");
  } else if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password");
  }
};

const validationEditData = (req) => {
  const AllowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "email",
    "photoUrl",
    "skills",
    "about",
  ];
  const isEditAllowed = Object.keys(req.body).every((feild) => {
    AllowedFields.includes(feild);
  });
  return isEditAllowed;
};
module.exports = { validationSignUpData, validationEditData };
