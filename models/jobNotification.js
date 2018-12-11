const mongoose = require('mongoose');

const User = require('./user');
const UserDetails = require('./userDetails');
const Employee = require('./employee');

const jobNotificationSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    jobDuration: {
        type: String,
        required: true
    },
    requirements: {
        type: [String],
        required: true
    },
    location: {
        type: [String],
        required: true
    },
    aboutJob: {
        type: String,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    postedAt: {
        type: Date,
        required: true
    },
    applied: {
        type: [mongoose.Schema.Types.ObjectId]
    }
})

const JobNotification = module.exports = mongoose.model('JobNotification',jobNotificationSchema);

module.exports.postJobNotification = function(newJobNotification, callback){
    newJobNotification.save(callback);
}

module.exports.checkNotificationExists = function(companyId, jobRole, jobType, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId), jobRole: jobRole, jobType: jobType};
    JobNotification.find(query, callback);
}

module.exports.releasedJobNotification = function(companyId, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId)};
    JobNotification.find(query, callback);
}

module.exports.getApplicants = function(jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId)};
    JobNotification.aggregate([
        {$match: query},
        {$project: {
            _id: 1,
            applied: 1
        }},
        {$unwind: "$applied"},
        {
            $lookup: {
                from: 'userdetails',
                localField: 'applied',
                foreignField: 'userId',
                as: "userinfo" 
            }
        },
        {
            $project: {
                _id: 1,
                applied: 1,
                "userinfo.technicalSkills": 1,
                "userinfo.resume": 1,
                "userinfo.personalDetails.firstName": 1,
                "userinfo.personalDetails.lastName": 1,
                "userinfo.personalDetails.mail": 1,
                "userinfo.personalDetails.phone": 1,
                "userinfo.experience": 1
            }
        }
    ]).exec(callback);
}

module.exports.acceptApplicants = function(jobId, userId,  callback){
    JobNotification.update(
        {_id:mongoose.Types.ObjectId(jobId)},
        {$pull: {applied: mongoose.Types.ObjectId(userId)}},
        callback
    )
}

module.exports.getJobDetailsById = function(jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId)};
    JobNotification.findById(query,{jobType:1, jobRole: 1, salary: 1, jobDuration: 1, location: 1 }, {$unwind: "location"}, callback);
} 

module.exports.applyForJob = function(userId, jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId),applied: {$nin: [mongoose.Types.ObjectId(userId)]}};
    JobNotification.findOneAndUpdate(query, {$push: {applied: userId}},callback);
}

module.exports.getJobNotifications = function(userId, callback){
    var query = {applied: {$nin: [mongoose.Types.ObjectId(userId)]}};
    JobNotification.find(query, callback);
}

module.exports.getAppliedJobs = function(userId, callback){
    var query = {applied: {$in: [mongoose.Types.ObjectId(userId)]}};
    JobNotification.find(query, callback);
}