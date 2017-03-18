 const express = require('express');
 const router = express.Router();
 const config = require('../../config/database');

 const ToogleSwitch = require('../../models/smartDevices/toogleSwitch'); 

 //add ToogleSwitch route
 router.post('/add', (req, res, next) => {
    let newToogleSwitch = new ToogleSwitch({
        user_id: req.body.user_id,
        name: req.body.name,
        description: req.body.description,
        state: req.body.state
    });

    ToogleSwitch.addToogleSwitch(newToogleSwitch, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to add Toogle Switch'});
        } else {
            res.json({ success: true, msg: 'Toogle Switch added'});
        }
    });
 });

 //change State ToogleSwitch route
 router.post('/changeState', (req, res, next) => {

    let id = req.body.id;
    let newState = req.body.state;
    
    ToogleSwitch.changeToogleSwitchState(id, newState, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to change Toogle Switch state'});
        } else {
            res.json({ success: true, msg: 'State changed'});
        }
    });
 });
 
 //delete ToogleSwitch route
 router.post('/delete', (req, res, next) => {

    let toogleSwitch = req.body;

    ToogleSwitch.deleteToogleSwitch(toogleSwitch, (err) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to delete Toogle Switch state'});
        } else {
            res.json({ success: true, msg: 'Toogle Switch deleted'});
        }
    });
 });

//get ToogleSwitch route
 router.get('/', (req, res) => {
    ToogleSwitch.getToogleSwitches((err, toogleSwitches) => {
        if(err) {
            return res.json({ success: false, msg: 'Toogle Switches not found'});
        }
        res.json(toogleSwitches);
    });
 });

 module.exports = router;