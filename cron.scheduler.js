const cron = require('node-cron');
const { birthdayEmailJob } = require("./src/job/job");



//schedule a job to run every day 7:00 AM
 cron.schedule('0 21 * * *', async () => {
    try {
        console.log('🕒 Running birthday email job...');
        await birthdayEmailJob();
    } catch (error) {
        console.error(`❌ Error running birthday email job: ${error.message}`);
    }
});


// Start the job immediately
const initScheduledTasks = () => {
  console.log(`🕒 Initializing scheduled tasks...`);
};

module.exports = { initScheduledTasks };