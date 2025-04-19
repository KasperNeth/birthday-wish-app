const app = require("./app");
const {connectToMongoDB} = require("./backend/utils/db.connection");
require('dotenv').config();
const {initScheduledTasks} = require("./cron.scheduler")
connectToMongoDB();
initScheduledTasks(); // Initialize scheduled tasks


const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});