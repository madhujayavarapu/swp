const express = require('express');
const router = express.Router();
const request = require('request');

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const Jobs = require('../models/jobNotification');

var service = {
    getAllJobs: getAllJobs,
    getCountriesUnderIND: getCountriesUnderIND
}

module.exports = service;

function getAllJobs(req, res, next){
    Jobs.getAllJobNotifications((err, jobs) => {
        if(err){
            return res.json({success:false, msg:"Something went wrong"});
        }else{
            if(jobs){
                return res.json({success: true,data: jobs});
            }else{
                return res.json({success:false, msg:"Failed to Fetch Jobs.Please Try Again."});
            }
        }
    })
}

function getCountriesUnderIND(req, res, next){
    res.json({success:true, data: [{key: "Andhra Pradesh", value: "Andhra Pradesh"}]});
}