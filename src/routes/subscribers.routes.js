const Router = require("express").Router;
const { subscriberController } = require("../controllers/subscribers.controller");
const {errorMsgFormatter} = require("../middlewares/error.validation")
const {subscriberValidations} = require("../validations/subscribers.validation")
const {subscriberLimiter} = require("../middlewares/ratelimit")






const route = Router()

route.post("/", subscriberLimiter,subscriberValidations,errorMsgFormatter,subscriberController)


module.exports = route