const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const DIR = './uploads/resumes';
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, DIR);
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+ file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/pdf" || file.mimetype === "application/msword"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});
const UserDetails = require('../models/userDetails');

router.post('/updateProfile', upload.single('resume'), (req, res, next) => {
    // console.log(req.file);
    if(req.file == undefined){
        res.json({success: false, message: "file format wrong"});
    }else{
        let skills = JSON.parse(req.body.technicalInfo);
        skills = skills.keySkills;

        let educationalInfo = JSON.parse(req.body.educationalInfo);
        let personalInfo = JSON.parse(req.body.personalInfo);
        let experience = JSON.parse(req.body.experienceInfo);

        let newUserDetails = new UserDetails({
            personalDetails: personalInfo,
            educationDetails: educationalInfo,
            technicalSkills: skills,
            experience: experience,
            resume: req.file.path,
            userId: req.body.userId
        });
        UserDetails.addUserDetails(newUserDetails, (err, isInserted) => {
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

module.exports = router;