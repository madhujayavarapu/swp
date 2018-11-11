const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const roles = require('../config/roles');
const dbConfig = require('../config/database');

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');

const commonSrv = require('../services/common.service');


function getUserByUsername(username){
    User.getUserByUsername(username, (err, result) => {
        if(err){
            res.json({success:false, msg: "something went wrong"});e
        }else{
            if(!!user){
                return user;
            }else{
                return false;
            }
        }
    })
}

function formatUser(user){
    let obj = {
        username: user.username,
        userId: user._id,
        role: user.role
    }
    return obj;
}

router.post('/register', (req, res, next) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        role: 3
    });
    User.getUserByUsername(req.body.username, (err, result) => {
        if(err){
            console.log(err);
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
})

router.post('/addUserDetails', (req, res, next) => {

    // let personalDetails = new 
    let userDetails = new UserDetails({
        personalDetails: req.body.personalDetails,
        educationDetails: req.body.educationDetails,
        technicalSkills: req.body.technicalSkills,
        userId: req.body.userId
    })
    UserDetails.addUserDetails(userDetails, (err, result) => {
        if(err)
            console.log(err);
        res.json({
            success: true,
            msg: "Details Saved"
        })
    })
})

router.post('/getUserDetails', (req, res, next) => {
    let userId = req.body.userId;

    User.getUserDetailsById(userId, (err, user) => {
        if(err){
            console.log(err);
            res.json({success:false,msg:"something went wrong"});
        }
        if(!!user){
            res.json({success:true,user:user});
        }else{
            res.json({success:true, msg: "user not found"});
        }
    })
})

router.post('/login', (req, res, next) => {
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
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: formatUser(user)
                    });
                }
            })
        }
    });
})

router.post('/startupRequest', (req, res, next) => {
    var date = new Date();
    // var currentDate = ('0'+date.getDate()).slice(-2)+('0'+(date.getMonth()-1)).slice(-2)+date.getFullYear();
    let newCompany = new Company({
        "companyName": req.body.companyName,
        "branches": req.body.branches,
        "awards": req.body.awards,
        "about": req.body.about,
        "website": req.body.website,
        "createdBy": req.body.createdBy,
        "establishedAt": date,
        "isAccepted": false
    })

    Company.sendStartupRequest(newCompany, (err, result) => {
        if(err){
            console.log(err);
            res.json({success:false, msg: "something went wrong"});
        }else{
            if(result){
                res.json({success:true, msg: "Request sent..Please wait for some time"});
            }else{
                res.json({success: true, msg: "Failed to Send request"});
            }
        } 
    })
})

router.post('/reqStatus', (req, res, next) => {
    Company.getReqStatus(req.body.userId, (err, status) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(status){
                res.json({success: true, reqStatus: status});
            }else{
                res.json({success: true, msg: "No Requests"});
            }
        }
    })
})

router.get('/viewStartupRequests', (req, res, next) => {
    Company.getStartupRequests((err,result) => {
        if(err){
            console.log(err);
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(result){
                res.json({success:true,companies: result});
            }else{
                res.json({success:true,msg:"No requests"});
            }
        }
    })
})

router.get('/getCompaniesList', (req, res, next) => {
    Company.getCompaniesList((err,result) => {
        if(err){
            console.log(err);
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(result){
                res.json({success:true,companies: result});
            }else{
                res.json({success:true,msg:"No requests"});
            }
        }
    })
})

router.post('/acceptStartupRequest', (req, res, next) => {
    let companyId = req.body.companyId;
    let userId = req.body.userId;
    Company.acceptStartupRequest(companyId, (err,result) => {
        if(err){
            console.log(err);
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(result){
                let rr = commonSrv.changeUserRoleTo(2, userId);
                // let notification = commonSrv.sendNotification("Congrats! Your request was accepted please login to manage your company..ALL THE BEST", userId);
                if(rr){
                    res.json({success:true, msg: "Accepted request"});
                }else{
                    res.json({success:false, msg: "Something wrong with updating user role"});
                }
            }else{
                res.json({success:false, msg: "Failed to accept"});
            }
        }
    })
})

module.exports = router;