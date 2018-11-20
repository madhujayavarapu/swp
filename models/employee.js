const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobRole: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true
    },
    jobDuration: {
        type: String,
        required: true
    },
    empName: {
        type: String,
        required: true
    }
})

const Employee = module.exports = mongoose.model('employees',EmployeeSchema);

module.exports.addEmployee = function(newEmp, callback){

    newEmp.save(callback);
}