const Router = require('express').Router;
const route = Router()


const subscriberRoute = require("./subscribers.routes")


route.use("/subscribers", subscriberRoute)


module.exports = route