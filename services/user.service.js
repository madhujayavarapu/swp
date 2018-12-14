const expresss = require("express");

// Models
const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const Employee = require('../models/employee');
const Jobs = require('../models/jobNotification');
const Applicants = require('../models/applicants');

// formatters
const commonFormatter = require('../formatters/common.formatter');

var service = {
    sendRequestForCompany: sendRequestForCompany,
    checkAnyCompanyRequestSentByUser: checkAnyCompanyRequestSentByUser,
    getAllJobsForUser: getAllJobsForUser,
    applyForJob: applyForJob,
    getJobsAppliedByUser: getJobsAppliedByUser
}

module.exports = service;

// Send Request for company
function sendRequestForCompany(req, res, next){
    var date = new Date();
    let newCompany = new Company({
        "name": req.body.name,
        "branches": req.body.branches,
        "awards": req.body.awards,
        "about": JSON.stringify(req.body.about),
        "website": req.body.website,
        "createdBy": req.body.createdBy,
        "establishedAt": req.body.establishedAt,
        "createdAt": date,
        "lastUpdated": date,
        "isAccepted": false,
        "address": JSON.stringify(req.body.address)
    })
    Company.addRequestForCompany(newCompany, (err, result) => {
        if(err){
            res.json({success:false, msg: "something went wrong", error: err});
        }else{
            if(result){
                res.json({success:true, msg: "Request sent..Admin needs to Accepts the request please wait for some time"});
            }else{
                res.json({success: true, msg: "Failed to Send request"});
            }
        } 
    })
}

// This function will check if any company request sent by user earlier.
function checkAnyCompanyRequestSentByUser(req, res, next){
    Company.checkAnyCompanyRequestSentByUser(req.body.userId, (err, isExist) => {
        if(err){
            res.json({success: false, msg: "Something went wrong", error: err});
        }else{
            if(isExist){
                res.json({success: true, msg: "User already sent a request", data:isExist});
            }else{
                res.json({success: false, msg: "No Requests made by user"});
            }
        }
    })
}

// It will fetch all the jobs which are not applied by user.
function getAllJobsForUser(req, res, next){
    let userId = req.body.userId;
    console.log(userId," is userId");
    
    Applicants.getAllJobIdsAppliedByUser(userId, (err, jobIds) => {
        if(err){
            return res.json({success: false, msg: "Something went wrong"});
        }else{
            if(jobIds){
                Jobs.getAllJobNotifications((err, jobs) => {
                    if(err){
                        return res.json({success:false, msg:"Something went wrong"});
                    }else{
                        if(jobs){
                            return res.json({success:true, data:commonFormatter.getAvailableJobsForUser(jobs, jobIds)});
                        }else{
                            return res.json({success:false, msg:"Failed to Fetch Jobs"});
                        }
                    }
                })
            }else{
                return res.json({success:false, msg: "Failed to fetch Jobs"});
            }
        }
    })
}

// This function is to apply for a job.
function applyForJob(req, res, next){
    let newApplicant = new Applicants({
        jobId: req.body.jobId,
        userId: req.body.userId,
        companyId: req.body.companyId,
        status: req.body.status || 1
    })
    Applicants.addApplicant(newApplicant, (err, isInserted) => {
        if(err){
            return res.json({success:false, msg: "Something went wrong"});
        }else{
            if(isInserted){
                return res.json({success:true, msg: "Applied For Job"});
            }else{
                return res.json({success:false, msg: "Failed to Apply for Job.Please Try Again."});
            }
        }
    })
}

// This function will return all the jobs applied by user.
function getJobsAppliedByUser(req, res, next){
    let userId = req.body.userId;
    Applicants.getAllJobsAppliedByUser(userId, (err, jobs) => {
        if(err){
            return res.json({success: false, msg: "Something went wrong",error:err});
        }else{
            if(jobs){
                return res.json({success: true, data: jobs});
            }else{
                return res.json({success: false, msg:"Failed to Fetch Jobs.Please Try Again"});
            }
        }
    })
}