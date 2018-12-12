const mongoose = require('mongoose');

const NotificationsSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, required: true},
    message: {type: String, require: true},
    isSeen: {type: Boolean, required: false, default: false},
    isRed: {type:Boolean, required: false, default: false},
    postedAt: {type: Date, required: true}
})

const Notification = module.exports = mongoose.model("Notifications",NotificationsSchema);

module.exports.pushNotification = function(newNotification, callback){
    newNotification.save(callback);
}

module.exports.getAllNotificationsOfUser = function(userId, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Notification.find(query, callback);
}

module.exports.seenNotifications = function(userId, notifications, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Notification.updateMany(query, {$set: {"isSeen": true}},callback);
}

module.exports.readNotifications = function(userId, notification, callback){
    var query = {userId: mongoose.Types.ObjectId(userId)};
    Notification.update(query, {$set: {"isRed": true}}, callback);
}