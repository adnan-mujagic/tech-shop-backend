const { validateMissingFields } = require("./utilities/utils");

const registerValidation = (data) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,56}$/;

  let errors = [];
  let required_fields = [
    "username",
    "password",
    "first_name",
    "last_name",
    "email",
  ];
  let missing_fields = validateMissingFields(required_fields, data);

  if (missing_fields) {
    errors.push(missing_fields);
  }

  if (data.username && data.username.length <= 4) {
    errors.push("The username has to be at least 4 characters long");
  }

  if (data.password && !passwordRegex.test(data.password)) {
    errors.push(
      "The password must have at least 8 characters, including at least 1 special character and at least 1 digit"
    );
  }

  return errors;
};

const loginValidation = (data) => {
  let errors = [];
  let required_fields = ["password", "email"];
  let missing_fields = validateMissingFields(required_fields, data);

  if (missing_fields) {
    errors.push({ error: missing_fields });
  }

  return errors;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
