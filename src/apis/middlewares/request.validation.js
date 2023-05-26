const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var arr = errors.array();
    return res
      .status(422)
      .json({
        status: false,
        message: `Schema Validation error - ${arr[0].msg}`,
      });
  } else {
    next();
  }
};
