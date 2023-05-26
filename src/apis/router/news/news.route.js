const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { validate } = require("../../middlewares/request.validation");
const controllers = require("../../controllers/news/news.controller");

router.post("/", controllers.newsFeedController);

module.exports = router;
