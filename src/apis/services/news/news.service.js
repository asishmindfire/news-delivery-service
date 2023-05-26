const newsRepository = require("../../repositories/news.repository");
const categoryRepository = require("../../repositories/category.repository");

exports.newsFeed = (request_data) => {
  return new Promise(async (resolve, reject) => {
    let { filter, page } = request_data;
    try {
      let skip = (page - 1) * 20;
      let limit = 20;
      let query = { categoryId: "6470880a8335e1267683fe61" };
      let topStories;
      let categoryLimit;
      let newsFeed = [];
      let total = 0;
      let category_count = filter.length;
      const categoryList = await categoryRepository.findAll();
      if (category_count <= 0) {
        topStories = await newsRepository.findNews({
          query,
          skip,
          limit,
        });
        return resolve({ data: topStories, total: topStories.length });
      }

      categoryLimit = 20 / category_count;

      for (const category of filter) {
        query = {
          categoryId: categoryList
            .find((item) => item.title === category)
            ["_id"].toString(),
        };
        const data = await newsRepository.findNews({
          query,
          skip:
            category_count === 1
              ? skip
              : (page - 1) * Math.floor(categoryLimit),
          limit: category_count === 1 ? limit : Math.floor(categoryLimit),
        });
        total += data.length;
        newsFeed = [ ...newsFeed, ...data ];
      }

      resolve({ data: newsFeed, total: total });
    } catch (error) {
      console.log(error);
      reject({ message: error.message });
    }
  });
};
