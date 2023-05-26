const express = require("express");
const router = express.Router();
const controller = require("../../controllers/category/category.controller");

router.get("/", controller.getCategoryController);

module.exports = router;
