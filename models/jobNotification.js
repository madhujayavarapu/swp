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
    contactDetails: { type: String, required: false, default:"-1"}
})

const Jobs = module.exports = mongoose.model('Jobs',jobsSchema);

var dbOperations = {
    postJobNotification: postJobNotification,
    checkNotificationExists: checkNotificationExists,
    getAllJobNotifications: getAllJobNotifications,
    deleteJobNotification: deleteJobNotification,
    getAllJobsForUser: getAllJobsForUser,
    getJobDetailsById: getJobDetailsById,
    getAllJobsPostedByCompany: getAllJobsPostedByCompany
}
module.exports = dbOperations;

function postJobNotification(newJob, callback){
    newJob.save(callback);
}
function checkNotificationExists(companyId, jobRole, jobType, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId), role: jobRole, type: jobType};
    Jobs.find(query, callback);
}
function getAllJobsPostedByCompany(companyId, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId)};
    Jobs.find(query,{lastUpdated: 0}, callback);
}
function deleteJobNotification(post, callback){
    Jobs.remove(post, callback);
}
function getAllJobNotifications(callback){
    Jobs.find(callback);
}
function getJobDetailsById(jobId, callback){
    var query = {_id: mongoose.Types.ObjectId(jobId)};
    Jobs.findById(query,{lastUpdated: 0},callback);
}
function getAllJobsForUser(jobIds, callback){
    var query = {_id: {$nin: mongoose.Types.ObjectId(jobIds)}};
    Jobs.find(query,callback);
}