const validateMissingFields = (required_fields, data) => {
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
    msg = msg + " is/are required";
    return msg;
  }
  return 0;
};

module.exports.validateMissingFields = validateMissingFields;
