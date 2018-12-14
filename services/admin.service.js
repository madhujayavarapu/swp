const expresss = require("express");
const mongoose = require('mongoose');
const router = expresss.Router();

// Models
const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const Employee = require('../models/employee');
const JobNotification = require('../models/jobNotification');

// Formatters
const commonFormatter = require('../formatters/common.formatter')

var service = {
    acceptCompanyRequest: acceptCompanyRequest,
    viewCompanyRequests: viewCompanyRequests,
    getCompaniesList: getCompaniesList
}

module.exports = service;

// This function is for accepting the company request..
function acceptCompanyRequest(req, res, next){
    let companyId = req.body.companyId;
    let userId = req.body.userId;

    Company.acceptCompanyRequest(companyId, (err, isUpdated) => {
        if(err){
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(isUpdated){
                User.changeUserRole(userId, 2, (error, isRoleUpdated) => {
                    if(err){
                        res.json({success:false, msg:"Something wrong with updating user role"});
                    }else{
                        console.log(isRoleUpdated);
                        
                        if(isRoleUpdated){
                            res.json({success: true,msg: "Accepted Company Request"});
                        }else{
                            res.json({success: true,msg: "Failed to update user role"});
                        }
                    }
                })
            }else{
                res.json({success:false, msg: "Failed to accept"});
            }
        }
    })
}
// It will fetch all the companies requests from db.
function viewCompanyRequests(req, res, next){
    Company.getCompanyRequests((err,result) => {
        if(err){
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(result){
                res.json({success:true,companies: commonFormatter.formatCompaniesData(result)});
            }else{
                res.json({success:true,msg:"No requests"});
            }
        }
    })
}
// It will fetch all the companies which are approved by Admin.
function getCompaniesList(req, res, next){
    Company.getCompaniesList((err,result) => {
        if(err){
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(result){
                res.json({success:true,companies: result});
            }else{
                res.json({success:true,msg:"No requests"});
            }
        }
    })
}