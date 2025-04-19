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
    .custom((value) => {
      // Check if the date format is DD-MM-YYYY
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(value)) {
        throw new Error("Date of birth must be in the format DD-MM-YYYY");
      }
      
      // Manually parse the date (DD-MM-YYYY format)
      const [day, month, year] = value.split('-').map(Number);
      const date = new Date(year, month - 1, day); // Month is 0-indexed in JS
      
      // Check if it's a valid date (guards against inputs like 30-01-1999)
      const isValidDate = date.getDate() === day && 
                          date.getMonth() === month - 1 && 
                          date.getFullYear() === year;
                          
      if (!isValidDate) {
        throw new Error("Please enter a valid date");
      }
      
      // Check if the date is in the past
      const today = new Date();
      if (date > today) {
        throw new Error("Date of birth must be in the past");
      }
      
      return true;
    })
    .trim()
];

module.exports = {
  subscriberValidations
};