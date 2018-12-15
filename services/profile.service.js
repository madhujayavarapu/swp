const express = require('express');

// Models
const UserDetails = require('../models/userDetails');

var service = {
    getUserProfile: getUserProfile,
    updateProfile: updateProfile,
    updateExperience: updateExperience,
    addExperience: addExperience,
    deleteExperience: deleteExperience,
    updateEducation: updateEducation
}

module.exports = service;

// This function is to get the user profile info
function getUserProfile(req, res, next){
    let userId = req.body.userId;
    UserDetails.getUserProfile(userId, (err, userDetails) => {
        if(err){
            return res.json({success: false,msg: "Something went wrong", error: err});
        }else{
            if(userDetails){
              return res.json({success: true, msg: "Profile Data", data: userDetails})
            }else{
              return res.json({success: false, msg: "Failed to fetch user details"});
            }
        }
    })
}

// This function is to update the personal info in profile
// Note: In this we can update only PERSONAL INFO, TECHNICAL SKILLS, and we can add First Experience here.
// Need to pass type for this from UI..like what they are going to update.
function updateProfile(req, res, next){
    let userId = req.body.userId;
    if(req.body.type == "PersonalDetails"){
        let personalDetails = req.body.personalDetails;
        UserDetails.updatePersonalDetails(userId, personalDetails, (err, isUpdated) => {
            if(err){
                return res.json({success: false, msg: "something went wrong",error: err});
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        })
    }else if(req.body.type == "Skills"){
        let technicalSkills = req.body.technicalSkills;
        UserDetails.updateTechnicalSkills(userId, technicalSkills, (err, isUpdated) => {
            if(err){
                return res.json({success: false, msg: "something went wrong",error: err});
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        })
    }else if(req.body.type == "Experience"){
        let experience = req.body.experience;
        UserDetails.updateExperience(userId, experience, (err, isUpdated) => {
            if(err){
                return res.json({success: false, msg: "something went wrong",error: err});
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        }) 
    }else{
       return res.json({success: false, msg: "service not yet done for this"});
    }
}

// It'll will add the experience to the user profile
function addExperience(req, res, next){
    let userId = req.body.userId;
    let experience = req.body.experience;
    UserDetails.addExperience(userId, experience, (err, isAdded) => {
        if(err){
            return res.json({success: false, msg: "Something went wrong",error: err});
        }else{
            if(isAdded){
                return res.json({success: true, msg: "Profile Updated Successfully"});
            }else{
                return res.json({success: false, msg: "Failed To add Experience"});
            }
        }
    })
}

// This function is to update the experience.
function updateExperience(req, res, next){
    let userId = req.body.userId;
    let expId = req.body.expId;
    let exp = req.body.exp;
    UserDetails.updateSpecificExperience(userId, expId, exp, (err, isUpdated) => {
        if(err){
            return res.json({success: false, msg: "something went wrong", error: err});
        }else{
            if(isUpdated){
                return res.json({success: true, msg: "Profile Updated"});
            }else{
                return res.json({success: false, msg: "Failed to Update Profile"});
            }
        }
    })
}

// This function is to delete the Exeprience.
function deleteExperience(req, res, next){
    let userId = req.body.userId;
    let expId = req.body.expId;
    UserDetails.deleteExperience(userId, expId, (err, isDeleted) => {
        if(err){
            return res.json({success: false, msg: "something went wrong",error: err});
        }else{
            if(isDeleted){
                return res.json({success: true, msg: "Deleted Experience"});
            }else{
                return res.json({success: false, msg: "Failed to Delete Experience"});
            }
        }
    })
}

// This function is to update Education..
// we have 3 different things in this: SSC, PUC, UG
// From UI you need to pass type
function updateEducation(req, res, next){
    let userId = req.body.userId;
    let updatedDetails = req.body.updatedDetails;
    let type = req.body.type;

    if(type == "SSC"){
        UserDetails.updateSSC(userId, updatedDetails, (err, isUpdated) => {
            if(err){
              return res.json({success: false,msg: "Something went wrong",error: err});  
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        })
    }else if(type == "PUC"){
        UserDetails.updatePUC(userId, updatedDetails, (err, isUpdated) => {
            if(err){
              return res.json({success: false,msg: "Something went wrong",error: err});  
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        })
    }else if(type == "UG"){
        UserDetails.updateUG(userId, updatedDetails, (err, isUpdated) => {
            if(err){
              return res.json({success: false,msg: "Something went wrong",error: err});  
            }else{
                if(isUpdated){
                    return res.json({success: true, msg: "Profile Updated"});
                }else{
                    return res.json({success: false, msg: "Failed to Update Profile"});
                }
            }
        })
    }else{
        return res.json({success: false, msg: "Type not matched"});
    }
}