const mongoose = require('mongoose');
//const Transaction = require('mongoose-transactions');

const User = require('./user');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true
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
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    address:{
        type: String,
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
    createdAt: {
        type: Date,
        required: true
    },
    lastUpdated: {
        type: Date,
        required: true
    },
    isAccepted: {
        type: Number,
        required: false,
        default: 1
        // 1 means pending
        // 2 means rejected by admin
        // 3 means approved by admin.
    }
})

const Company = module.exports = mongoose.model('Companies',companySchema);

module.exports.addRequestForCompany = function(newCompany, callback){
    newCompany.save(callback);
}

module.exports.checkAnyCompanyRequestSentByUser = function(userId, callback){
    var query = {createdBy: mongoose.Types.ObjectId(userId)};
    Company.find(query,{isAccepted: 0, lastUpdated: 0, createdBy: 0},callback);
}

module.exports.getCompanyRequests = function(callback){
    var query = {isAccepted: false};
    Company.find(query,
        {branches:1, awards: 1, name: 1, about: 1, website: 1, createdBy: 1, establishedAt: 1, address: 1, _id: 1}
        ,callback)
}

module.exports.acceptCompanyRequest = function(companyId, callback){
    var query = {_id:mongoose.Types.ObjectId(companyId)};
    Company.findOneAndUpdate(query, {$set: {"isAccepted": true}},callback);
}

module.exports.getCompaniesList = function(callback){
    var query = {isAccepted: true};
    Company.find(query,
        {branches:1, awards: 1, name: 1, about: 1, website: 1, createdBy: 1, establishedAt: 1, address: 1, _id: 1}
        ,callback);
}

module.exports.getCompanyIdOfUser = function(userId, callback){
    var query = {createdBy: mongoose.Types.ObjectId(userId)};
    Company.findOne(query, {_id: 1},callback);
    // Company.aggregate([
    //     {$match: query},
    //     {$project: {
    //         _id: 1
    //     }}
    // ]).exec(callback)
}

module.exports.getCompanyBranches = function(companyId, callback){
    var query = {_id: mongoose.Types.ObjectId(companyId)};
    Company.aggregate([
        {$match: query},
        {$project: {
            branches: 1,
            name: 1,
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
