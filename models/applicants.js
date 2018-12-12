const mongoose = require('mongoose');
const express = require('express');

const ApplicantsSchema = mongoose.Schema({
    jobId: {type: mongoose.Schema.Types.ObjectId, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    companyId: {type: mongoose.Schema.Types.ObjectId, required: true},
    status: {type: String, required: false}
})

const Applicants  = module.exports = mongoose.model("Applicants",ApplicantsSchema)

module.exports.addApplicant = function(newApplicant, callback){
    newApplicant.save(callback);
}

module.exports.getApplicantsForJob = function(jobId, callback){
    var query = {jobId: mongoose.Types.ObjectId(jobId)};
    Applicants.find(query,callback);
}

module.exports.getAllJobsAppliedByUser = function(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Applicants.find(query, callback);
}