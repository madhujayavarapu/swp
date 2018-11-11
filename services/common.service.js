const express = require('express');
const router = express.Router();

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');

module.exports.changeUserRoleTo = function(newRole, userId){
    User.changeUserRole(userId, newRole, (err, result) => {
        if(err){
            return false;
        }
        return true;
    })
}

module.exports.sendNotification = function(msg, userId){
    // Notification.
}

module.exports.isValidUser = function(username){
    User.getUserByUsername(username, (err, result) => {
        if(err){
            return false;
        }else if(result){
            return true;
        }else{
            return false;
        }
    })
}