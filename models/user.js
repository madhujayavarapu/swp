const mongoose = require('mongoose');
const dbConfig = require('../config/database');

const UserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}