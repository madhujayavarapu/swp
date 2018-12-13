const express = require('express');
const constants = require('../config/constant');

var service = {
    getJobLocations: getJobLocations,
    getJobRoles: getJobRoles
}
module.exports = service;

function getJobRoles(req, res, next){
    res.json({success:true, data: constants.jobRoles});
}

function getJobLocations(req, res, next){
    res.json({success: true, data: constants.jobLocations});
}