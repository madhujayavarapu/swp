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
        ref: 'user'
    }
})

const UserDetails = module.exports = mongoose.model('UserDetails', UserDetailsSchema);

module.exports.addUserDetails = function(newUserDetails, callback){
    newUserDetails.save(callback);
}