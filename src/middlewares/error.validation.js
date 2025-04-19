const { validationResult } = require("express-validator");

const errorMsgFormatter = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path, // Use `err.path` to get the field/parameter name
      message: err.msg, // Error message
    }));
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Validation failed",
      errors: formattedErrors, // Send formatted errors
    });
  }
  next(); // No errors, proceed to the next middleware/controller
};

module.exports = {errorMsgFormatter};