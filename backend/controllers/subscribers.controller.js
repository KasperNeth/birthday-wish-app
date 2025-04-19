const { subscriberService, processTodayBirthdays } = require("../services/subscribers.service");

const subscriberController = async (req, res) => {
  const { username, email, dateOfBirth } = req.body;
  
  const serviceResponse = await subscriberService({ username, email, dateOfBirth });
  
 
  return res.status(serviceResponse.code).json({serviceResponse});
};


const processTodayBirthdaysController = async (req, res) => {
  const serviceResponse = await processTodayBirthdays();
  
  // Send standardized response
  return res.status(serviceResponse.code).json({serviceResponse});
};

module.exports = {
  subscriberController,
  processTodayBirthdaysController
};