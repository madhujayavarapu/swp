const mongoose = require('mongoose');

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
    }
})

const JobNotification = module.exports = mongoose.model('JobNotification',jobNotificationSchema);

module.exports.postJobNotification = function(newJobNotification, callback){
    newJobNotification.save(callback);
}

module.exports.checkNotificationExists = function(companyId, jobRole, callback){
    var query = {companyId: mongoose.Types.ObjectId(companyId), jobRole: jobRole};
    JobNotification.find(query, callback);
}


module.exports.getJobNotifications = function(callback){
    JobNotification.find(callback);
}