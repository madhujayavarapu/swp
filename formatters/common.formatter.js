const mongoose = require('mongoose');
var service = {
    formatUser: formatUser,
    generateResponse: generateResponse,
    getAvailableJobsForUser: getAvailableJobsForUser,
    formatCompaniesData: formatCompaniesData
}

module.exports = service;

function formatUser(user){
    let obj = {
        username: user.username,
        userId: user._id,
        role: user.role
    }
    obj.entityId = user.role == 2 ? user.entityId : "";
    return obj;
}

function generateResponse(success, msg, data){
    var response = {};
    response.success = success;
    if(msg != null){
        response.msg = msg;
    }
    if(data != null){
        response.data = data;
    }
    return response;
}

function getAvailableJobsForUser(jobs, appliedJobIds){
    let AvailableJobs = [];
    let applied = 0;
    jobs.forEach(job => {
        applied = 0
        appliedJobIds.forEach(id => {
            if(id.jobId.toString() == job._id.toString()){
                applied = 1;
            }
        })
        if(!applied){
            AvailableJobs.push(job);
        }
    });
    return AvailableJobs;
}

function formatCompaniesData(data){
    data.forEach(record => {
        record.about = JSON.parse(record.about);
        record.address = JSON.parse(record.address);
    })
    return data;
}
