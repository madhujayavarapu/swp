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

var dbOperations = {
    addApplicant: addApplicant,
    getApplicantsForJob: getApplicantsForJob,
    getAllJobsAppliedByUser: getAllJobsAppliedByUser,
    getAllJobIdsAppliedByUser: getAllJobIdsAppliedByUser,
    rejectApplicant: rejectApplicant
}
module.exports = dbOperations;

function addApplicant(newApplicant, callback){
    newApplicant.save(callback);
}

function getApplicantsForJob(jobId, callback){
    var query = {jobId: mongoose.Types.ObjectId(jobId),"status": 1};
    Applicants.aggregate([
        {$match: query},
        {$lookup:{from:'users',localField:'userId',foreignField:'_id',as:'applicants'}},
        {$project:{"applicants.username":1,"applicants.role":1}}
    ]).exec(callback);
}
// Change collection from user to userdetails
function getAllJobsAppliedByUser(userId, callback){
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
function getAllJobIdsAppliedByUser(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Applicants.find(query, {_id:0,jobId:1},callback);
}

function rejectApplicant(applicantId, callback){
    var query = {"_id": mongoose.Types.ObjectId(applicantId)};
    Applicants.findOneAndUpdate(query, {$set: {"status": 2}}, callback);
}