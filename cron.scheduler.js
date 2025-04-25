const cron = require('node-cron');
const { birthdayEmailJob } = require("./src/job/job");
const http = require("http")
const https =require("https")
require("dotenv").config()

const APP_URL = process.env.APP_KEEP_LIFE || " https://birthday-wish-app-5zid.onrender.com"
TIME_FRAME = 14*60*1000 // 14 minutes in milliseconds

const keepRenderAwake = () => {
  console.log( `[${new Date().toISOString()}]🌐 Keeping the app alive...`);

  const url = APP_URL.startsWith("https") ? https : http;
  const req = url.get(APP_URL, (res) => {
    console.log(`[${new Date().toISOString()}] 🌐 App is alive! Status code: ${res.statusCode}`);
  }
  );
  req.on("error", (err) => {
    console.error(`[${new Date().toISOString()}] ❌ Error keeping the app alive: ${err.message}`);
  });
}

let keepAliveInterval = null;

const startKeepAliveApp = ()=> {
  console.log(`[${new Date().toISOString()}] 🌐 Starting keep-alive process...`);
  keepRenderAwake()
  if(!keepAliveInterval){
    keepAliveInterval = setInterval(keepRenderAwake, TIME_FRAME)
  }
  console.log(`[${new Date().toISOString()}] 🌐 Keep-alive process started! every ${TIME_FRAME/1000/60} mins`);
 
}

//schedule a job to run every day 7:00 AM
 cron.schedule('0 7 * * *', async () => {
    try {
        console.log('🕒 Running birthday email job... 7: 00 AM');
        await birthdayEmailJob();
    } catch (error) {
        console.error(`❌ Error running birthday email job: ${error.message}`);
    }
});


// Start the job immediately
const initScheduledTasks = () => {
  console.log(`🕒 Initializing scheduled tasks...`);
};

module.exports = { initScheduledTasks,  startKeepAliveApp };