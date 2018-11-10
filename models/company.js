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
        type: [String]
    },
    about: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    establishedAt: {
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