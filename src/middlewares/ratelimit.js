const rateLimiter= require('express-rate-limit')

const subscriberLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    headers: true,
    keyGenerator: (req) => `${req.ip}`,
    message: { success: false, code:429, message: "Yo! Too many request 😅 Please try again later!" },
});

module.exports = {subscriberLimiter}