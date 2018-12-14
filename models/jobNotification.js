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
    salary: {type: String, required: true},
    type:{type: String, required: true},
    experience: {type: String, required: true},
    duration: {type: String, required: false},
    qualification: { type: String, required: true },
    requirements: { type: [String], required: true },
    location: { type: [String], required: true },
    about: { type: String, required: true },
    role: { type: String, required: true },
    companyName: { type: String, required: true },
    postedBy: { type: String, required: true },
    postedAt: { type: Date, required: true },
    lastUpdated: { type: Date, required: true },
    status: {type: Number, required: true, default: 1},
    contactDetails: { type: String, required: false, default:"-1"}
})

const Jobs = module.exports = mongoose.model('Jobs',jobsSchema);

module.exports.postJobNotification = function(newJob, callback){
    newJob.save(callback);
}
module.exports.checkNotificationExists = function(companyId, jobRole, jobType, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId), role: jobRole, type: jobType};
    Jobs.find(query, callback);
}
module.exports.getAllJobsPostedByCompany = function(companyId, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId)};
    Jobs.find(query,{lastUpdated: 0}, callback);
}
module.exports.deleteJobNotification =  function(post, callback){
    Jobs.remove(post, callback);
}
module.exports.getAllJobNotifications = function(callback){
    Jobs.find(callback);
}
module.exports.getJobDetailsById = function(jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId)};
    Jobs.findById(query,{lastUpdated: 0},callback);
}
module.exports.getAllJobsForUser = function(jobIds, callback){
    var query = {_id: {$nin: mongoose.Types.ObjectId(jobIds)}};
    Jobs.find(query,callback);
}