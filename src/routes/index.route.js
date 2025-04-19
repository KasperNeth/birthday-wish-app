const Router = require('express').Router;
const route = Router()


const subscriberRoute = require("./subscribers.routes")
const cronRoute = require("./cron.routes")


route.use("/api/subscribers", subscriberRoute)
route.use("/api/cron", cronRoute)


module.exports = route