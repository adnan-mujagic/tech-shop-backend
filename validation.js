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
  let missing_fields = [];

  required_fields.forEach((field) => {
    if (!data[field]) {
      missing_fields.push(field);
    }
  });

  if (missing_fields.length > 0) {
    let msg = "The field/s ";
    missing_fields.forEach((missing_field) => {
      msg = msg + missing_field + ", ";
    });
    msg = msg.substring(0, msg.length - 2);
    msg = msg + " is/are required. ";

    errors.push({ error: msg });
  }

  if (data.username && data.username.length <= 4) {
    errors.push({ error: "The username has to be at least 4 chars long" });
  }

  if (!passwordRegex.test(data.password)) {
    errors.push({
      error:
        "The password must have at least 8 chars, including at least 1 special character and at least 1 digit",
    });
  }

  return errors;
};

module.exports.registerValidation = registerValidation;
