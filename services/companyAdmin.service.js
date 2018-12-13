const expresss = require("express");
const router = expresss.Router();

// Models
const User = require('../models/user');
const UserDetails = require('../models/userDetails');
const Company = require('../models/company');
const Employee = require('../models/employee');
const Jobs = require('../models/jobNotification');
const Applicants = require('../models/applicants');

var service = {
    postJobNotification: postJobNotification,
    getAllJobsPostedByCompany: getAllJobsPostedByCompany,
    deleteJobNotification: deleteJobNotification,
    getApplicantsForJob: getApplicantsForJob,
    rejectApplicant: rejectApplicant
}

module.exports = service;

// This function is for posting job notification
function postJobNotification(req, res, next){
    var date = new Date();
    let newJobNotification = new Jobs({
        companyId: req.body.companyId,
        salary: req.body.salary,
        type: req.body.type,
        duration: req.body.duration,
        qualification: req.body.qualification,
        requirements: req.body.requirements,
        location: req.body.location,
        about: JSON.stringify(req.body.about),
        role: req.body.role,
        companyName: req.body.companyName,
        postedBy: req.body.postedBy,
        postedAt: date,
        lastUpdated: date,
        contactDetails: JSON.stringify(req.body.contactDetails)
    })
    Jobs.checkNotificationExists(req.body.companyId, req.body.role, req.body.type, (err2, isExist) => {
        if(err2){
            res.json({success:false,msg:"something went wrong",err:err2});
        }else{
            if(isExist.length == 0){
                Jobs.postJobNotification(newJobNotification, (err, result) => {
                    if(err){
                        res.json({success:false,msg:"something went wrong", err: err});
                    }else{
                        if(result){
                            res.json({success: true, msg: "Successfully posted job notification"});
                        }else{
                            res.json({success: false, msg: "Failed to Post Notification..Please try again"});
                        }
                    }
                })
            }else{
                res.json({success: false, msg: "Already Notification Posted"});
            }
        }
    })
}

// This function is to get the notifications released by a particular company.
function getAllJobsPostedByCompany(req, res, next){
    let companyId = req.body.companyId;
    Jobs.getAllJobsPostedByCompany(companyId, (err, result) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }else{
            if(result){
                res.json({success: true, data: result});
            }else{
                res.json({success: false, msg:"Failed to Retrieve Posts"});
            }
        }
    })
}

// This function is to delete the notification posted earlier.
function deleteJobNotification(req, res, next){
    let postToDelete = {
        "type": req.body.type,
        "role": req.body.role,
        "companyId": req.body.companyId
    }
    Jobs.deleteJobNotification(postToDelete, (err, isDeleted) => {
        if(err){
            return res.json({success:false, msg:"Something went wrong", error: err});
        }else{
            if(isDeleted){
                return res.json({success: true, msg: "Deleted Post"});
            }else{
                return res.json({success: false, msg: "Failed to Delete Post.Please Try Again"});
            }
        }
    })
}

// This function is to get the applicants for a job posted by that company.
//  Note: we won't get the applicants who are already rejected.
function getApplicantsForJob(req, res, next){
    let jobId = req.body.jobId;
    Applicants.getApplicantsForJob(jobId, (err, applicants) => {
        if(err){
            res.json({success: false, msg: "Something Went Wrong"});
        }else{
            if(applicants){
                res.json({success: true, data: applicants});
            }else{
                res.json({success: false, msg: "Failed to retrieve applicants"});
            }
        }
    })
}

function rejectApplicant(req, res, next){
    let applicantId = req.body.applicantId;
    Applicants.rejectApplicant(applicantId, (err, isRejected) => {
        if(err){
            res.json({success: false, msg: "Something went wrong", error: err});
        }else{
            if(isRejected){
                res.json({success: true, msg: "Rejected Applicant"});
            }else{
                res.json({success: false, msg: "Failed to Reject Applicant..Please try again"});
            }
        }
    })
}

// accept applicant
// let newEmp = new Employee({
//     jobRole: req.body.empRole,
//     jobType: req.body.empType,
//     jobDuration: req.body.duration,
//     salary: req.body.salary,
//     joiningDate: req.body.joiningDate,
//     companyId: req.body.companyId,
//     userId: req.body.userId,
//     branch: req.body.branch,
//     empName: req.body.empName,
//     userRole: req.body.userRole
// });

// let jobId = req.body.jobId;
// let userId = req.body.userId;
// let userRole = req.body.userRole;

// if(userRole === 3){
//     Employee.addEmployee(newEmp, (err, result) => {
//         if(err){
//             res.json({success: false, msg: "Something went wrong"});
//         }else{
//             if(result){
//                 JobNotification.acceptApplicants(jobId, userId, (err2, isDeleted) => {
//                     if(err2){
//                         res.json({success: false, msg: "Something went wrong while deleting from job notification"});
//                     }else{
//                         if(isDeleted){
//                             // let notification = commonSrv.sendNotification("Congrats! Your request was accepted please login to manage your company..ALL THE BEST", userId);
//                             User.changeUserRole(userId, 5, (err, result) => {
//                                 if(err){
//                                     res.json(commonSrv.generateResponse(false,"Something went wrong with updating user role",null))
//                                 }
//                                 else{
//                                     if(result){
//                                         res.json(commonSrv.generateResponse(true,"Rejected Applicant",null));
//                                     }else{
//                                         res.json(commonSrv.generateResponse(false,"Failed to Reject Applicant",null));
//                                     }
//                                 }
//                             });
//                         }else{
//                             res.json({success: false, msg: "failed to delete from job notification"});
//                         }
//                     }
//                 })
//             }else{
//                 res.json({success: false, msg: "Failed to Hire Employee"});
//             }
//         }
//     })
// }else{
//     res.json(commonSrv.generateResponse(false,"Please hire Unemployed Person",null));
// }