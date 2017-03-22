const mongoose = require('mongoose');
const config = require('../config/database');

//UsersGroup schema
const UsersGroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const UsersGroup = module.exports = mongoose.model('UsersGroup', UsersGroupSchema);

module.exports.addNewGroup = (newGroup, callback) => {
    newGroup.save(callback);
}

module.exports.getUsersGroups = (callback) => {
    UsersGroup.find(callback);
}