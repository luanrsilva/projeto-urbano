const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authConfig = require('../config/auth.json');


const tokenBlacklistSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        expires: authConfig.timer
    },

    token: {
        type: String,
        required: true
    }
});

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema);

module.exports = TokenBlacklist;