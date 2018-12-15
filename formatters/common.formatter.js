const mongoose = require('mongoose');
var service = {
    formatUser: formatUser,
    generateResponse: generateResponse,
    getAvailableJobsForUser: getAvailableJobsForUser,
    formatCompaniesData: formatCompaniesData,
    formatApplicantsInfo: formatApplicantsInfo
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

function formatApplicantsInfo(data){
    var finalArr = [];
    data.forEach(record => {
        var obj = {};
        obj.applicantId = record._id;
        obj.username = record.login.username;
        obj.resume = record.userInfo[0].resume;
        obj.experience = record.userInfo[0].experience;
        obj.firstName = record.userInfo[0].personalDetails.firstName;
        obj.lastName = record.userInfo[0].personalDetails.lastName;
        obj.mail = record.userInfo[0].personalDetails.mail;
        obj.phone = record.userInfo[0].personalDetails.phone;
        obj.technicalSkills = record.userInfo[0].technicalSkills;
        finalArr.push(obj);
    })
    return finalArr;
}
