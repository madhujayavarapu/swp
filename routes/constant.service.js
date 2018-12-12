const express = require('express');
const router = express.Router();
const constants = require('../config/constant');

router.get('/getJobRoles', (req, res, next) => {
    res.json({success:true, data: constants.constants.jobRoles});
})

router.get('/getJobLocations', (req, res, next) => {
    res.json({success: true, data: constants.constants.jobLocations});
})

module.exports = router;