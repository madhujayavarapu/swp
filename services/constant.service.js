const express = require('express');
const constants = require('../config/constant');

var service = {
    getJobLocations: getJobLocations,
    getJobRoles: getJobRoles,
    getTechnicalSkills: getTechnicalSkills,
    getEmpRoles: getEmpRoles,
    getEducationQualification: getEducationQualification,
    getPostNotificationConstants: getPostNotificationConstants
}
module.exports = service;

function getJobRoles(req, res, next){
    res.json({success:true, data: constants.jobRoles});
}

function getJobLocations(req, res, next){
    res.json({success: true, data: constants.jobLocations});
}

function getTechnicalSkills(req, res, next){
    res.json({success: true, data: constants.skills});
}

function getPostNotificationConstants(req, res, next){
    let data = {
        empRoles: constants.jobRoles,
        qualification: constants.educationQualification,
        skills: constants.skills,
        experiences: constants.experience
    }
    res.json({success: true, data: data});
}

function getEmpRoles(req, res, next){
    res.json({success: true, data: constants.jobRoles});
}

function getEducationQualification(req, res, next){
    res.json({success: true, data: constants.educationQualification});
}