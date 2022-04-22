module.exports.updateEntity = (entity, updates, forbiddenFields = []) => {
  Object.keys(updates).forEach((key) => {
    if (!forbiddenFields.includes(key)) {
      entity[key] = updates[key];
    }
  });
};
