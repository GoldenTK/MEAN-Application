const mongoose = require('mongoose');
const config = require('../../config/database');

const UserSchema = require('../../models/user');

//User schema
const ToogleSwitchSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    },
});

const ToogleSwitch = module.exports = mongoose.model('ToogleSwitch', ToogleSwitchSchema);

module.exports.changeToogleSwitchState = (id, newState, callback) => {
    const query1 = {_id: id}
    const query2 = {$set: {state: newState}};
    ToogleSwitch.update(query1, query2, callback);
}

module.exports.getToogleSwitches = (callback) => {
     ToogleSwitch.find(callback);
}
module.exports.deleteToogleSwitch = (toogleSwitch, callback) => {
     ToogleSwitch.remove(toogleSwitch, callback);
}

module.exports.addToogleSwitch = (newToogleSwitch, callback) => {
    newToogleSwitch.save(callback);
}