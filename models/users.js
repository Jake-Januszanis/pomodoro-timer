const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    lastLogin: Date
});


module.exports = mongoose.model('User', userSchema);