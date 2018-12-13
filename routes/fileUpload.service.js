const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const DIR = './uploads/resumes';
const PROFILEPIC_DIR = './uploads/profile';
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, DIR);
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+ file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});
const UserDetails = require('../models/userDetails');

router.post('/create', passport.authenticate('jwt',{session: false}), upload.single('resume'), (req, res, next) => {
    // console.log(req.file);
    if(req.file == undefined){
       return res.json({success: false, message: "file format wrong"});
    }else{
        let skills = JSON.parse(JSON.stringify(req.body.technicalInfo));
        skills = skills.keySkills;

        let educationalInfo = JSON.parse(JSON.stringify(req.body.educationalInfo));
        let personalInfo = JSON.parse(JSON.stringify(req.body.personalInfo));
        let experience = JSON.parse(JSON.stringify(req.body.experienceInfo));
        let fileName = req.file.path.split('/');
        fileName = fileName.slice(-1).join();

        let newUserDetails = new UserDetails({
            personalDetails: personalInfo,
            educationDetails: educationalInfo,
            technicalSkills: skills,
            experience: experience,
            resume: fileName,
            userId: req.body.userId
        });
        UserDetails.createProfileForUser(newUserDetails, (err, isInserted) => {
            if(err){
                res.json({success:false,msg: "something went wrong"});
            }else{
                if(isInserted){
                    res.json({success: true,msg: "Saved Details"});
                }else{
                    res.json({success: false, msg: "Failed to Insert"})
                }
            }
        })
    }
})

router.post('/uploadResume', passport.authenticate('jwt',{session: false}),  upload.single('resume'), (req, res, next) => {
    if(req.file == undefined){
        return res.json({success: false, msg: "file format wrong..only accepts .pdf and .docx"});
    }else{
        let fileName = req.file.path.split('/');
        fileName = fileName.slice(-1).join();
        let resume = fileName;
        let userId = req.body.userId;

        UserDetails.uploadResume(userId, resume, (err, isUploaded) => {
            if(err){
                return res.json({success: false, msg: "Something went wrong", error: err});
            }else{
                if(isUploaded){
                    return res.json({success: true, msg: "Uploaded Resume"});
                }else{
                    return res.json({success: false, msg: "Failed to Upload"});
                }
            }
        })
    }
})

module.exports = router;