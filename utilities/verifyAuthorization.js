const JWT = require("./jwt");

module.exports.verifyAuthorization = (headers, requiredRole) => {
  try {
    const { role } = JWT.verify(headers.authorization);
    return role === requiredRole;
  } catch (error) {
    return false;
  }
};
