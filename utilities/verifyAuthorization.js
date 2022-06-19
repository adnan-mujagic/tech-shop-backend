const JWT = require("./jwt");

module.exports.verifyAuthorization = (headers, requiredRoles = ["NORMAL"]) => {
  try {
    const { role } = JWT.verify(headers.authorization);
    return requiredRoles.includes(role);
  } catch (error) {
    return false;
  }
};
