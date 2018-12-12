const mongoose = require('mongoose');

const User = require('./user');
const UserDetails = require('./userDetails');
const Employee = require('./employee');

const jobsSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    salary: {type: Number, required: true},
    type:{type: String, required: true},
    duration: {type: String, required: false},
    Qualification: { type: [String], required: true },
    requirements: { type: [String], required: true },
    location: { type: [String], required: true },
    about: { type: [String], required: true },
    role: { type: String, required: true },
    companyName: { type: String, required: true },
    postedBy: { type: String, required: true },
    postedAt: { type: Date, required: true },
    contactDetails: { type: Object, required: false }
})

const Jobs = module.exports = mongoose.model('Jobs',jobsSchema);

module.exports.postJobNotification = function(newJob, callback){
    newJob.save(callback);
}

module.exports.checkNotificationExists = function(companyId, jobRole, jobType, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId), role: jobRole, type: jobType};
    Jobs.find(query, callback);
}

module.exports.releasedJobNotification = function(companyId, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId)};
    Jobs.find(query, callback);
}

// module.exports.getApplicants = function(jobId, callback){
//     var query = {_id: mongoose.Types.ObjectId(jobId)};
//     Jobs.aggregate([
//         {$match: query},
//         {$project: {
//             _id: 1,
//             applied: 1
//         }},
//         {$unwind: "$applied"},
//         {
//             $lookup: {
//                 from: 'userdetails',
//                 localField: 'applied',
//                 foreignField: 'userId',
//                 as: "userinfo" 
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 applied: 1,
//                 "userinfo.technicalSkills": 1,
//                 "userinfo.resume": 1,
//                 "userinfo.personalDetails.firstName": 1,
//                 "userinfo.personalDetails.lastName": 1,
//                 "userinfo.personalDetails.mail": 1,
//                 "userinfo.personalDetails.phone": 1,
//                 "userinfo.experience": 1
//             }
//         }
//     ]).exec(callback);
// }

// module.exports.acceptApplicants = function(jobId, userId,  callback){
//     Jobs.update(
//         {_id:mongoose.Types.ObjectId(jobId)},
//         {$pull: {applied: mongoose.Types.ObjectId(userId)}},
//         callback
//     )
// }

module.exports.getJobDetailsById = function(jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId)};
    Jobs.findById(query,{jobType:1, jobRole: 1, salary: 1, jobDuration: 1, location: 1 }, {$unwind: "location"}, callback);
} 

// module.exports.applyForJob = function(userId, jobId, callback){
//     var query = {_id: mongoose.Types.ObjectId(jobId),applied: {$nin: [mongoose.Types.ObjectId(userId)]}};
//     JobNotification.findOneAndUpdate(query, {$push: {applied: userId}},callback);
// }

module.exports.getJobNotifications = function(userId, callback){
    var query = {applied: {$nin: [mongoose.Types.ObjectId(userId)]}};
    Jobs.find(query, callback);
}

module.exports.getAppliedJobs = function(userId, callback){
    var query = {applied: {$in: [mongoose.Types.ObjectId(userId)]}};
    Jobs.find(query, callback);
}