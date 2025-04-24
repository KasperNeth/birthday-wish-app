const Router = require("express").Router;
const { processTodayBirthdaysController } = require("../controllers/subscribers.controller");

const route = Router();

//an endpoint that can be triggered externally
route.get("/run-birthday-job", processTodayBirthdaysController);
route.get("/render-alive", (req,res) => {
  res.status(200).json({
    message: "🌐 Keep alive is running!",
    routes: {
      "/run-birthday-job": "Trigger the birthday email job",
    },
  });
})

module.exports = route;