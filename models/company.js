const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    branches: {
        type: [String],
        required: true
    },
    awards: {
        type: [String],
        required: false
    },
    about: {
        type: [String],
        required: true
    },
    website: {
        type: String,
        required: true
    },
    gallery:{
        type: [String],
        required: false
    },
    address:{
        type: [String],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    establishedAt: {
        type: Date,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    isAccepted: {
        type: Boolean,
        required: true,
        default: false
    }
})

const Company = module.exports = mongoose.model('Companies',companySchema);

module.exports.sendStartupRequest = function(newCompany, callback){
    newCompany.save(callback);
}

module.exports.getStartupRequests = function(callback){
    var query = {isAccepted: false};
    Company.find(query,callback)
}

module.exports.acceptStartupRequest = function(companyId, callback){
    var query = {_id:mongoose.Types.ObjectId(companyId)};
    Company.findOneAndUpdate(query, {isAccepted: true}, callback);
}

module.exports.getCompaniesList = function(callback){
    var query = {isAccepted: true};
    Company.find(query, callback);
}

module.exports.getCompanyIdOfUser = function(userId, callback){
    var query = {createdBy: mongoose.Types.ObjectId(userId)};
    // Company.findOne(query, {$project: {_id: 1}},callback);
    Company.aggregate([
        {$match: query},
        {$project: {
            _id: 1
        }}
    ]).exec(callback)
}

module.exports.getBranchesUnderCompany = function(companyId, callback){
    var query = {_id: mongoose.Types.ObjectId(companyId)};
    Company.aggregate([
        {$match: query},
        {$project: {
            branches: 1,
            companyName: 1,
            _id: 0
        }}
    ]).exec(callback);
}

module.exports.getReqStatus = function(userId, callback){
    var query = {isAccepted: false,createdBy: mongoose.Types.ObjectId(userId)};
    // Company.find(query, callback);
    Company.aggregate([
        {
            $match: query
        },
        {
            $project: {
                companyName: 1,
                isAccepted: 1,
                establishedAt: 1,
                _id: 1
            }
        }
    ]).exec(callback);
}
