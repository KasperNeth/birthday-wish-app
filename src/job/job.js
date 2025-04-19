// cronController.js - This will be called by your cron job scheduler
const {processTodayBirthdays} = require("../services/subscribers.service");

const birthdayEmailJob = async () => {
  try {
    console.log('🕒 Starting birthday email job...');
    const result = await processTodayBirthdays();
    
    if (result.success) {
      console.log(`✅ Birthday job completed: ${result.message}`);
  
      return result;
    }
  } catch (error) {
    console.error(`❌ Error in birthday email job: ${error.message}`);
  
    throw error; // cron system to handle the error
  }
};

module.exports = { birthdayEmailJob };