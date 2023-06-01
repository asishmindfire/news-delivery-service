const schemas = require("schemas-npm-package");

module.exports = {
  findAll: async () => {
    return await schemas.NewsFeed.find({});
  },

  findByCondition: async (query) => {
    return await schemas.NewsFeed.find(query);
  },

  findByCategoryName: async (query) => {
    return await schemas.NewsFeed.find(query).populate("agencyId");
  },

  findNews: async ({ query, skip, limit }) => {
    console.log(query, skip, limit);
    return await schemas.NewsFeed.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("agencyId", "logo")
      .populate("categoryId", "title");
  },

  getLatestNews: async ({ query, limit }) => {
    console.log(query, limit);
    return await schemas.NewsFeed.find(query)
      .sort({ publishedAt: -1 })
      .limit(5)
      .populate("agencyId", "logo")
      .populate("categoryId", "title");
  },
};
