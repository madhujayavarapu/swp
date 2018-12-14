const express = require("express");
const router = express.Router();
const passport = require('passport');

// Services
const loginSrv = require('../services/login.service');
const userSrv = require('../services/user.service');
const adminSrv = require('../services/admin.service');
const companyAdminSrv = require('../services/companyAdmin.service');
const constantSrv = require('../services/constant.service');
const commonSrv = require('../services/common.service');
const profileSrv = require('../services/profile.service');

// Default Route
router.get('/getAllJobs',commonSrv.getAllJobs);

// Login Routes
router.post('/register', loginSrv.registerUser);
router.post('/login', loginSrv.authenticateUser);

// Normal User Routes
router.post('/sendRequestForCompany', passport.authenticate('jwt',{session: false}), userSrv.sendRequestForCompany);
router.post('/checkAnyCompanyRequestSentByUser', passport.authenticate('jwt',{session: false}), userSrv.checkAnyCompanyRequestSentByUser);
router.post('/getAllJobsForUser', userSrv.getAllJobsForUser);
router.post('/getJobsAppliedByUser', userSrv.getJobsAppliedByUser)
router.post('/applyForJob', userSrv.applyForJob);

// Admin Routes
router.get('/viewCompanyRequests', passport.authenticate('jwt',{session: false}), adminSrv.viewCompanyRequests);
router.get('/getCompaniesList', passport.authenticate('jwt',{session: false}), adminSrv.getCompaniesList);
router.post('/acceptCompanyRequest', passport.authenticate('jwt',{session: false}), adminSrv.acceptCompanyRequest);

// Company Admin Routes
router.post('/getCompanyBranches', passport.authenticate('jwt',{session:false}), companyAdminSrv.getCompanyBranches)
router.post('/postJobNotification',passport.authenticate('jwt',{session: false}), companyAdminSrv.postJobNotification);
router.post('/getAllJobsPostedByCompany', passport.authenticate('jwt',{session: false}), companyAdminSrv.getAllJobsPostedByCompany);
router.post('/deleteJobNotification', passport.authenticate('jwt',{session: false}), companyAdminSrv.deleteJobNotification);
router.post('/getApplicantsForJob', passport.authenticate('jwt',{session: false}), companyAdminSrv.getApplicantsForJob);
router.post('/rejectApplicant', passport.authenticate('jwt',{session: false}), companyAdminSrv.rejectApplicant)

// Profile Routes
router.post('/getUserProfile', passport.authenticate('jwt',{session: false}), profileSrv.getUserProfile);
router.post('/updateProfile', passport.authenticate('jwt',{session: false}), profileSrv.updateProfile);
router.post('/updateExperience', passport.authenticate('jwt',{session: false}), profileSrv.updateExperience);
router.post('/addExperience', passport.authenticate('jwt',{session: false}), profileSrv.addExperience);
router.post('/deleteExperience', passport.authenticate('jwt',{session: false}), profileSrv.deleteExperience);
router.post('/updateEducation', passport.authenticate('jwt',{session: false}), profileSrv.updateEducation);

// Common Routes
router.get('/getCountriesUnderIND', commonSrv.getCountriesUnderIND);

// constants
router.get('/getJobRoles',constantSrv.getJobRoles);
router.get('/getJobLocations', constantSrv.getJobLocations);
router.get('/getTechnicalSkills',constantSrv.getTechnicalSkills);
router.get('/getEmpRoles',constantSrv.getEmpRoles);
router.get('/getEducationQualification',constantSrv.getEducationQualification);
router.get('/getPostNotificationConstants',constantSrv.getPostNotificationConstants);

module.exports = router;