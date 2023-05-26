const Services = require("../../services/category/category.service");

exports.getCategoryController = async (req, res) => {
  try {
    const response = await Services.retrieveCategory();
    res.status(200).json({
      status: true,
      message: "Category retrieved successfully!",
      data: response,
    });
  } catch (error) {
    console.log(`Error at getCategoryController`, error);
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
