const express = require('express');

const commonSrv = require('./common.service');

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const JobNotification = require('../models/jobNotification');
const Employee = require('../models/employee');

module.exports.getEmpUnderCompany = function(companyId){
    Employee.getEmpUnderCompany(companyId, (err, emp) => {
        if(err){
          return res.json({success:false,msg:"Something went wrong"});
        }else{
            if(emp){
                return res.json({success: true,data: emp});
            }else{
                return res.json({success: false, msg: "Failed to Get Employees"});
            }
        }
    })
}

module.exports.rejectApplicant = function(jobId, userId){
    
} 




