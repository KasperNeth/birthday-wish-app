const app = require("./app");
const {connectToMongoDB} = require("./src/utils/db.connection");
require('dotenv').config();
const {initScheduledTasks, startKeepAliveApp} = require("./cron.scheduler")
connectToMongoDB();
//comment out internal scheduler to use external scheduler
// initScheduledTasks(); // Initialize scheduled tasks
//use external scheduler to run the job for better performance because of render's free plan which makes the cron-jon to run late and not run at all sometimes and when using both the job will run twice

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  startKeepAliveApp(); // Start the keep-alive process after the server starts
});