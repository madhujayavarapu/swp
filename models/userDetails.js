const mongoose = require('mongoose');
const User = require('./user');


const UserDetailsSchema = mongoose.Schema({
    personalDetails: {
        type: Object,
    },
    educationDetails: {
        type: Object
    },
    technicalSkills: {
        type: [String]
    },
    experience: {
        type: Object
    },
    resume: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
        ref: 'user'
    }
})

const UserDetails = module.exports = mongoose.model('UserDetails', UserDetailsSchema);

var dbOperations = {
    // createProfileForUser: createProfileForUser,
    getUserProfile: getUserProfile,
    updatePersonalDetails: updatePersonalDetails,
    updateTechnicalSkills: updateTechnicalSkills,
    updateExperience: updateExperience,
    updateSpecificExperience: updateSpecificExperience,
    deleteExperience: deleteExperience,
    addExperience: addExperience,
    updateSSC: updateSSC,
    updatePUC: updatePUC,
    updateUG: updateUG,
    uploadResume: uploadResume
}
// module.exports = dbOperations;

module.exports.createProfileForUser = function(newUserDetails, callback){
    newUserDetails.save(callback);
}

function getUserProfile(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.find(query, callback);
}

function updatePersonalDetails(userId, personalDetails, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {personalDetails: personalDetails}},callback);
}

function updateTechnicalSkills(userId, technicalSkills, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {technicalSkills: technicalSkills}},callback);
}

function updateExperience(userId, experience, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {experience: experience}},callback);
}

function updateSpecificExperience(userId, expId, exp, callback){
    var query = {userId: mongoose.Types.ObjectId(userId), "experience.experiences._id": expId}
    UserDetails.findOneAndUpdate(query, {$set: {"experience.experiences.$": exp}}, callback);
}

function deleteExperience(userId, expId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)}
    var bulk = UserDetails.collection.initializeOrderedBulkOp();
    bulk.find(query).updateOne({$pull: {"experience.experiences": {_id: expId}}});
    bulk.find(query).updateOne({$set: {"experience.expType": "fresher"}});
    bulk.execute(callback);
}

function addExperience(userId, exp, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$push: {"experience.experiences": exp}},callback)
}

function updateSSC(userId, updatedSSC, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.ssc": updatedSSC}}, callback);
}

function updatePUC(userId, updatedPUC, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.puc": updatedPUC}}, callback);
}

function updateUG(userId, updatedUG, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.ug": updatedUG}}, callback);
}

function uploadResume(userId, resume, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"resume": resume}}, callback);
}
