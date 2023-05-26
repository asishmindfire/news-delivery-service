const schemas = require("schemas-npm-package");

module.exports = {
  findAll: async () => {
    return await schemas.Category.find({});
  },
  findByCondition: async (query) => {
    return await schemas.Category.find(query);
  },
};
