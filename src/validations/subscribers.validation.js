const { body } = require("express-validator");

const subscriberValidations = [
  body("username")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 5 }).withMessage("Username must be at least 5 characters long")
    .isString().withMessage("Username must be a string")
    .trim()
    .escape(),
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email must be a valid email address")
    .normalizeEmail()
    .isString().withMessage("Email must be a string")
    .trim(),
    body("dateOfBirth")
    .notEmpty().withMessage("Date of birth is required")
    .isISO8601().withMessage("Date of birth must be in a valid date format")
    .custom((value) => {
      // Check if the date is valid
      const inputDate = new Date(value);
      if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date format");
      }
      
      
      const today = new Date();
      
      // Reset both dates to midnight for fair comparison
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
      
      // Strict validation (must be before today)
      if (inputDate >= today) {
        throw new Error("Date of birth must be in the past (before today)");
      }
      
      // Additional validation for Reasonable age check
      const minYear = 1900;
      if (inputDate.getFullYear() < minYear) {
        throw new Error(`Date of birth must be after ${minYear}`);
      }
      
      return true;
    })
    .trim()
];

module.exports = {
  subscriberValidations
};