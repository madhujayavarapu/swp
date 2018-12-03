const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const roles = require('../config/roles');
const dbConfig = require('../config/database');

const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const Employee = require('../models/employee');
const JobNotification = require('../models/jobNotification');

const commonSrv = require('../services/common.service');
const adminSrv = require('../services/admin.service');

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
    obj.entityId = user.role == 2 ? user.entityId : "";
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
                    if(user.role == 2){
                        Company.getCompanyIdOfUser(user._id, (err, result) => {
                            if(err){
                                res.json({success:false,msg:"something went wrong"});
                            }else{
                                if(result){
                                    user.entityId = result[0]._id;
                                    res.json({success: true, token: 'JWT '+token,user: formatUser(user)});
                                }else{
                                    res.json({success: false, msg: "Failed to get Entity Id"});
                                }
                            }
                        })
                    }else{
                        res.json({
                            success: true,
                            token: 'JWT '+token,
                            user: formatUser(user)
                        });
                    }
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
                User.changeUserRole(userId, 2, (error, isUpdated) => {
                    if(err){
                        res.json(commonSrv.generateResponse(false, "Something went wrong", null));
                    }
                    else{
                        if(isUpdated){
                            res.json(commonSrv.generateResponse(true, "Accepted Company Request", null));
                        }else{
                            res.json(commonSrv.generateResponse(false, "Something wrong with updating user role", null));
                        }
                    }
                })
            }else{
                res.json({success:false, msg: "Failed to accept"});
            }
        }
    })
})

router.post('/getBranchesUnderCompany', (req, res, next) => {
    let companyId = req.body.companyId;
    Company.getBranchesUnderCompany(companyId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg: "Failed to retrieve branches"});
            }
        }
    })
})

router.post('/postJobNotification', (req, res, next) => {
    let newJobNotification = new JobNotification({
        companyId: req.body.companyId,
        companyName: req.body.companyName,
        salary: req.body.salary,
        location: req.body.branch,
        requirements: req.body.requirements,
        aboutJob: req.body.description,
        jobRole: req.body.empRole,
        jobType: req.body.empType,
        jobDuration: req.body.duration,
        postedBy: req.body.postedBy,
        postedAt: req.body.postedAt,
        applied: []
    })
    JobNotification.checkNotificationExists(req.body.companyId, req.body.empRole, req.body.empType, (err2, isExist) => {
        if(err2){
            res.json({success:false,msg:"something went wrong"});
        }else{
            if(isExist.length == 0){
                JobNotification.postJobNotification(newJobNotification, (err, result) => {
                    if(err){
                        res.json({success:false,msg:"something went wrong"});
                    }else{
                        if(result){
                            res.json({success: true, msg: "Successfully posted job notification"});
                        }else{
                            res.json({success: false, msg: "Failed to post notification..please try again"});
                        }
                    }
                })
            }else{
                res.json({success: false, msg: "Already notification posted"});
            }
        }
    })
})

router.post('/releasedJobNotifications', (req, res, next) => {
    let companyId = req.body.companyId;
    JobNotification.releasedJobNotification(companyId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg:"Failed to retrieve jobs"});
            }
        }
    })
})

router.post('/getApplicants', (req, res, next) => {
    let jobId = req.body.jobId;
    JobNotification.getApplicants(jobId, (err, result) => {
        if(err){
            res.json({success: false, msg: "something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg: "Failed to retrieve applicants"});
            }
        }
    })
})

router.post('/acceptApplicant', (req, res, next) => {
    let newEmp = new Employee({
        jobRole: req.body.empRole,
        jobType: req.body.empType,
        jobDuration: req.body.duration,
        salary: req.body.salary,
        joiningDate: req.body.joiningDate,
        companyId: req.body.companyId,
        userId: req.body.userId,
        branch: req.body.branch,
        empName: req.body.empName,
        userRole: req.body.userRole
    });

    let jobId = req.body.jobId;
    let userId = req.body.userId;
    let userRole = req.body.userRole;

    if(userRole === 3){
        Employee.addEmployee(newEmp, (err, result) => {
            if(err){
                res.json({success: false, msg: "Something went wrong"});
            }else{
                if(result){
                    JobNotification.acceptApplicants(jobId, userId, (err2, isDeleted) => {
                        if(err2){
                            res.json({success: false, msg: "Something went wrong while deleting from job notification"});
                        }else{
                            if(isDeleted){
                                // let notification = commonSrv.sendNotification("Congrats! Your request was accepted please login to manage your company..ALL THE BEST", userId);
                                User.changeUserRole(userId, 5, (err, result) => {
                                    if(err){
                                        res.json(commonSrv.generateResponse(false,"Something went wrong with updating user role",null))
                                    }
                                    else{
                                        if(result){
                                            res.json(commonSrv.generateResponse(true,"Rejected Applicant",null));
                                        }else{
                                            res.json(commonSrv.generateResponse(false,"Failed to Reject Applicant",null));
                                        }
                                    }
                                });
                            }else{
                                res.json({success: false, msg: "failed to delete from job notification"});
                            }
                        }
                    })
                }else{
                    res.json({success: false, msg: "Failed to Hire Employee"});
                }
            }
        })
    }else{
        res.json(commonSrv.generateResponse(false,"Already Hired by some other company",null));
    }
})

router.post('/rejectApplicant', (req, res, next) => {
    let jobId = req.body.jobId;
    let userId = req.body.userId;
    JobNotification.acceptApplicants(jobId, userId, (err, result) => {
        if(err){
            res.json(commonSrv.generateResponse(false, "Something went wrong",null));
        }else{
            if(result){
                res.json(commonSrv.generateResponse(true, "Rejected Applicant",null));
            }else{
                res.json(commonSrv.generateResponse(false, "Failed to Reject Applicant..Please try again",null));
            }
        }
    })
})

router.post('/getJobDetails', (req, res, next) => {
    let jobId = req.body.jobId;
    JobNotification.getJobDetailsById(jobId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg: "Job Not Found"});
            }
        }
    })
})

router.post('/applyForJob', (req, res, next) => {
    let jobId = req.body.jobId;
    let userId = req.body.userId;
    JobNotification.applyForJob(userId, jobId, (err, result) => {
        if(err){
            res.json({success: true, msg: "something went wrong"});
        }else{
            if(result){
                res.json({success: true, msg: "Applied For Job..Please wait for the response"});
            }else{
                res.json({success: false, msg: "Failed to apply for Job"});
            }
        }
    })
})

router.post('/availableJobs', (req, res, next) => {
    let userId = req.body.userId;
    JobNotification.getJobNotifications(userId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg: "Failed to retrieve jobs"});
            }
        }
    })
})

router.post('/appliedJobs', (req, res, next) => {
    let userId = req.body.userId;
    JobNotification.getAppliedJobs(userId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg: "You are not yet applied for any jobs"});
            }
        }
    })
})

router.post('/getEmpUnderCompany', (req, res, next) => {
    let companyId = req.body.companyId;
    Employee.getEmpUnderCompany(companyId, (err, emps) => {
        if(err){
            res.json({success: false, msg: "something went wrong"});
        }else{
            if(emps){
                res.json({success: true, data: emps});
            }else{
                res.json({success: false, msg: "Failed to fetch employees"});
            }
        }
    })
})

module.exports = router;