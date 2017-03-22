const express = require('express');
const router = express.Router();
const config = require('../config/database');

 const UsersGroup = require('../models/usersGroup'); 

 //Add users group
 router.post('/add', (req, res, next) => {
    const name = req.body.name;
    let newGroup = new UsersGroup ({
        name: name
    });
    UsersGroup.addNewGroup(newGroup, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to add group'});
        } else {
            res.json({ success: true, msg: 'Users Group added'});
        }
    });
 });

 //Get users group
 router.get('/', (req, res, next) => {
    UsersGroup.getUsersGroups((err, usersGroups) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to get group'});
        } else {
            res.json(usersGroups);
        }
    });
 });

 module.exports = router;