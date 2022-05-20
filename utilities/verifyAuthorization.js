const JWT = require("./jwt");

module.exports.verifyAuthorization = (headers, requiredRoles = ["NORMAL"]) => {
  try {
    const { role } = JWT.verify(headers.authorization);
    console.log(role);
    return requiredRoles.includes(role);
  } catch (error) {
    return false;
  }
};
