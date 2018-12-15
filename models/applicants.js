const mongoose = require('mongoose');
const express = require('express');

const Jobs = require('./jobNotification');

const ApplicantsSchema = mongoose.Schema({
    jobId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true},
    status: {type: Number, required: false, default: 1}
})

const Applicants  = module.exports = mongoose.model("Applicants",ApplicantsSchema);

module.exports.addApplicant = function(newApplicant, callback){
    newApplicant.save(callback);
}

module.exports.getApplicantsForJob = function(jobId, callback){
    var query = {jobId: mongoose.Types.ObjectId(jobId),"status": 1};
    Applicants.aggregate([
        {$match: query},
        {$lookup:{from:'userdetails',localField:'userId',foreignField:'userId',as:'userInfo'}},
        {$lookup: {from:'users',localField:'userId',foreignField:'_id',as: "login"}},
        {$project:{
            "userInfo.resume":1,
            "userInfo.personalDetails.firstName":1,
            "userInfo.personalDetails.lastName":1,
            "userInfo.personalDetails.mail":1,
            "userInfo.personalDetails.phone":1,
            "userInfo.experience": 1, 
            "userInfo.technicalSkills":1,
            "login.username": 1,
            "userId": 1
            }
        }
    ]).exec(callback);
}
// Change collection from user to userdetails
module.exports.getAllJobsAppliedByUser = function(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Applicants.aggregate([
        {$match: query},
        {
            $lookup: {
                from: 'jobs',
                localField: 'jobId',
                foreignField: '_id',
                as: 'jobs'
            }
        },
        {
            $project: {
                "jobs.lastUpdated": 0,
                "jobs.companyId": 0,
                "jobs._id": 0
            }
        },
        {$unwind :"$jobs"}
    ]).exec(callback);
}
module.exports.getAllJobIdsAppliedByUser = function(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Applicants.find(query, {_id:0,jobId:1},callback);
}

module.exports.rejectApplicant = function(applicantId, callback){
    var query = {"_id": mongoose.Types.ObjectId(applicantId)};
    Applicants.findOneAndUpdate(query, {$set: {"status": 2}}, callback);
}