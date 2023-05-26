const categoryRepository = require("../../repositories/category.repository");

exports.retrieveCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const category = await categoryRepository.findAll();
      if (category && category.length >= 0) {
        return resolve(category);
      }
      reject({
        status: 1,
        statusCode: 400,
        message: "Unable to retrieve categories.",
      });
    } catch (error) {
      reject({ message: error.message });
    }
  });
};
