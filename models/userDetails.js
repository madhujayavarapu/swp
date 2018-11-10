const mongoose = require('mongoose');
const User = require('./user');

// const personalDetailsSchema = {
//     name: {
//         type: String,
//         required: true
//     },
//     mail: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     phone: {
//         type: Number,
//         required: true,
//         unique: true
//     },
//     address: {
//         type: Object,
//         required: true
//     }
// }

// const marksObject = {
//     studiedAt: {
//         type: String
//     },
//     branch: {
//         type: String
//     },
//     percentage: {
//         type: Number,
//         default: 0
//     }
// }

// const educationalDetailsSchema = {
//     ssc: {
//         type: marksObject
//     },
//     puc: {
//         type: marksObject
//     },
//     ug: {
//         type: marksObject
//     },
//     pg: {
//         type: marksObject
//     }
// }

const technicalSkillsSchema = {
    languages: {
        type: [String]
    }
}

const UserDetailsSchema = mongoose.Schema({
    personalDetails: {
        type: Object,
    },
    educationDetails: {
        type: Object
    },
    technicalSkills: {
        type: technicalSkillsSchema
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