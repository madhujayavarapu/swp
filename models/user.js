const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/database');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        require: true,
        default: 3,
    }
});

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
    // newUser.save(callback);
}

module.exports.comparePassword = function(usrPassword, hash, callback){
    bcrypt.compare(usrPassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null,isMatch);
    });
}

module.exports.changeUserRole = function(userId, newRole, callback){
    var query = {_id: mongoose.Types.ObjectId(userId)};
    User.findOneAndUpdate(query,{$set: {role: newRole}},callback);
}

module.exports.getUserById = function(userId, callback){
    var query = { _id: userId };
    User.findById(query,callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserDetailsById = function(userId, callback){
    User.aggregate([
        { $match: {_id: mongoose.Types.ObjectId(userId)}},
        { 
            $lookup: {
                from: 'userdetails',
                localField: '_id',
                foreignField: 'userId',
                as: "userinfo"
            }
        }
    ]).exec(callback);
}