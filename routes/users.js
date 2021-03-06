 const express = require('express');
 const router = express.Router();
 const passport = require('passport');
 const jwt = require('jsonwebtoken');
 const config = require('../config/database');

 const User = require('../models/user'); 

 //Register route
 router.post('/register', (req, res, next) => {
    let newUser = new User({
         name: req.body.name,
         email: req.body.email,
         username: req.body.username,
         userGroup: req.body.userGroup,
         password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to register user'});
        } else {
            res.json({ success: true, msg: 'User registered'});
        }
    });
 });

 //Authenticate route
 router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            return res.json({ success: false, msg: 'User not found'});
        }

        User.comparePassword(password,user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 3600 // 1 hour
                });

            res.json({
                success: true,
                token: 'JWT '+token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    userGroup: user.userGroup
                }
            });
            } else {
                return res.json({ success: false, msg: 'Wrong password'});
            }
        });
    });
 });
 
 //Change User password
 router.post('/changeUserPassword', (req, res, next) => {
    const id = req.body.id;
    const password = req.body.password;

    User.changePassword(id, password, (err, user) => {
        if(err) {
            res.json({ success: false, msg: 'Failed to change password'});
        } else {
            res.json({ success: true, msg: 'Password changed'});
        }
    });
});

 //Profile route
 router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
 });

 //Get users
 router.get('/', (req, res, next) => {
    User.getUsers((err, users) => {
        if(err) {
            return res.json({ success: false, msg: 'Users not found'});
        }
        res.json(users);
    });
 });

 module.exports = router;