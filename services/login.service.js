const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

// config files
const roles = require('../config/roles');
const dbConfig = require('../config/database');

// Models
const User = require('../models/user');
const Company = require('../models/company');

// Formatters
const commonFormatter = require('../formatters/common.formatter');

var service = {
    registerUser: registerUser,
    authenticateUser: authenticateUser
}
module.exports = service;

function registerUser(req, res, next){
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role || roles.user
    });
    User.getUserByUsername(req.body.username, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(!result){
                User.addUser(user, (err, result) => {
                    if(err){
                        console.log(err);
                    }
                    res.json({
                        success: true,
                        "msg": "User added successfully"
                    })
                })
            }else{
                res.json({success:false, msg: "Username already exists"});
            }
        }
    })
}

function authenticateUser(req, res, next){
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername(username,(err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: "User Not Found"});
        }else{
            User.comparePassword(password, user.password, (err2, isMatch) => {
                if(err2) throw err2;
                if(!isMatch){
                    return res.json({success: false,msg:"Password doesn't match"});
                }else{
                    const token = jwt.sign(user.toJSON(), dbConfig.secret, {
                        expiresIn: 3600 // expires in 1 hour
                    })
                    if(user.role == 2){
                        Company.getCompanyIdOfUser(user._id, (err, result) => {
                            if(err){
                                res.json({success:false,msg:"something went wrong"});
                            }else{
                                if(result){
                                    user.entityId = result._id;
                                    res.json({success: true, token: 'JWT '+token,user: commonFormatter.formatUser(user)});
                                }else{
                                    res.json({success: false, msg: "Failed to get Entity Id"});
                                }
                            }
                        })
                    }else{
                        res.json({
                            success: true,
                            token: 'JWT '+token,
                            user: commonFormatter.formatUser(user)
                        });
                    }
                }
            })
        }
    });
}