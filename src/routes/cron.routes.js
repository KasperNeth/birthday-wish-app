const Router = require("express").Router;
const { processTodayBirthdaysController } = require("../controllers/subscribers.controller");

const route = Router();

//an endpoint that can be triggered externally
route.get("/run-birthday-job", processTodayBirthdaysController);

module.exports = route;