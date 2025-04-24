const app = require("./app");
const {connectToMongoDB} = require("./src/utils/db.connection");
require('dotenv').config();
const {initScheduledTasks, startKeepAliveApp} = require("./cron.scheduler")
connectToMongoDB();
initScheduledTasks(); // Initialize scheduled tasks


const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  startKeepAliveApp(); // Start the keep-alive process after the server starts
});