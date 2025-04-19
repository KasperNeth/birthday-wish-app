const mongoose = require('mongoose')

const Schema = mongoose.Schema
subscriberSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        max: Date.now(),
        required: true
    }
})

const subscriberModel = mongoose.model('subscriber', subscriberSchema)

module.exports = {subscriberModel}