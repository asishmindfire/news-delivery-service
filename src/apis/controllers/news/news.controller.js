const Services = require("../../services/news/news.service");

exports.newsFeedController = async (req, res) => {
  try {
    const response = await Services.newsFeed(req.body);
    res.status(200).json({
      status: true,
      message: "Top stories",
      total: response.total,
      data: response.data,
    });
  } catch (error) {
    console.log(`Error at newsFeedController`, error);
    if (error.status === 1) {
      return res.status(error.statusCode).json({
        status: false,
        message: error.message,
      });
    }
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
