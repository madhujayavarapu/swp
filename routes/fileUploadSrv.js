const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
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
// const profileStorage = multer.diskStorage({
//     destination: function(req, file, cb){
//         cb(null, PROFILEPIC_DIR);
//     },
//     filename: function(req, file, cb){
//         cb(null, new Date().toISOString()+ file.originalname);
//     }
// })
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

// const profileFilter = (req, file, cb) => {
//     if(file.mimetype === "" || file.mimetype === "" || file.mimetype === ""){
//         cb(null, true);
//     }else{
//         cb(null, false);
//     }
// }

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
});

// const profilePicUpload = multer({
//     storage: profileStorage,
//     limits:{
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: profileFilter
// })
const UserDetails = require('../models/userDetails');

router.post('/updateProfile', upload.single('resume'), (req, res, next) => {
    // console.log(req.file);
    if(req.file == undefined){
       return res.json({success: false, message: "file format wrong"});
    }else{
        let skills = JSON.parse(req.body.technicalInfo);
        skills = skills.keySkills;

        let educationalInfo = JSON.parse(req.body.educationalInfo);
        let personalInfo = JSON.parse(req.body.personalInfo);
        let experience = JSON.parse(req.body.experienceInfo);
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

router.post('/uploadResume', upload.single('resume'), (req, res, next) => {
    if(req.file == undefined){
        return res.json({success: false, msg: "file format wrong..only accepts .pdf and .docx"});
    }else{
        let fileName = req.file.path.split('/');
        fileName = fileName.slice(-1).join();
        console.log(fileName," is filename");

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

// router.post('/uploadProfilePic', upload.single(''))

module.exports = router;