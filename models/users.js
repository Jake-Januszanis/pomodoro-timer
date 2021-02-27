const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
    name: String,
    username: String,
    password: String,
    lastLogin: Date,
    studyTime:[{
        date: Date,
        time: Number
    }]
});


module.exports = mongoose.model('User', userSchema);