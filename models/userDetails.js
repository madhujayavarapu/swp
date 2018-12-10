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

module.exports.addUserDetails = function(newUserDetails, callback){
    newUserDetails.save(callback);
}

module.exports.getUserDetails = function(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.find(query, callback);
}

module.exports.updatePersonalDetails = function(userId, personalDetails, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {personalDetails: personalDetails}},callback);
}

module.exports.updateTechnicalSkills = function(userId, technicalSkills, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {technicalSkills: technicalSkills}},callback);
}

module.exports.updateExperience = function(userId, experience, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {experience: experience}},callback);
}

module.exports.updateExperienceDetails = function(userId, expId, exp, callback){
    var query = {userId: mongoose.Types.ObjectId(userId), "experience.experiences._id": expId}
    UserDetails.findOneAndUpdate(query, {$set: {"experience.experiences.$": exp}}, callback);
}

module.exports.deleteExperience = function(userId, expId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)}
    var bulk = UserDetails.collection.initializeOrderedBulkOp();
    bulk.find(query).updateOne({$pull: {"experience.experiences": {_id: expId}}});
    bulk.find(query).updateOne({$set: {"experience.expType": "fresher"}});
    bulk.execute(callback);
}

module.exports.addExperience = function(userId, exp, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$push: {"experience.experiences": exp}},callback)
}

module.exports.updateSSC = function(userId, updatedSSC, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.ssc": updatedSSC}}, callback);
}

module.exports.updatePUC = function(userId, updatedPUC, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.puc": updatedPUC}}, callback);
}

module.exports.updateUG = function(userId, updatedUG, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"educationDetails.ug": updatedUG}}, callback);
}

module.exports.uploadResume = function(userId, resume, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    UserDetails.findOneAndUpdate(query, {$set: {"resume": resume}}, callback);
}
