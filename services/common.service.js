const express = require('express');
const router = express.Router();

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const JobNotification = require('../models/jobNotification');

module.exports.changeUserRoleTo = function(newRole, userId){
    User.changeUserRole(userId, newRole, (err, result) => {
        if(err){
            return false;
        }
        else{
            if(result){
                return true;
            }else{
                return false;
            }
        }
        // return true;
    })
}

module.exports.generateResponse = function(success, msg, data){
    var response = {};
    response.success = success;
    if(msg != null){
        response.msg = msg;
    }
    if(data != null){
        response.data = data;
    }
    return response;
}

module.exports.sendNotification = function(msg, userId){
    // Notification.
}

module.exports.checkNotificationExists = function(companyId, jobRole){
    
    JobNotification.checkNotificationExists(companyId, jobRole, (err, result) => {
        if(err){
            return false;
        }else{
            if(result.length == 0){
                return true;
            }else{
                return false;
            }
        }
    })
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

module.exports.getEntityId = function(userId){
    Company.getCompanyIdOfUser(userId, (err, result) => {
        if(err){
            return "";
        }else{
            if(result){
                return result;
            }else{
                return "";
            }
        }
    })
}