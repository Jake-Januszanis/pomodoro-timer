const router = require('express').Router();
const User = require('../models/users');
const mongoose = require('mongoose');



router.get('/', async (req, res) => {
    User.findOneAndUpdate({username: req.session.user.username}, {lastLogin: new Date()}, {upsert: true, new: true}, function(err, result) {
        if (err) {
              res.send(err)
            } else {
                res.render("dashboard", {user: result})
            }
    })
});

module.exports = router;