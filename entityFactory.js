const entityFactory = (entity, requestBody) => {
  Object.keys(requestBody).forEach((key) => {
    entity[key] = requestBody[key];
  });
};

module.exports.entityFactory = entityFactory;
