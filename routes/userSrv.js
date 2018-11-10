const express = require("express");
const router = express.Router();

const User = require('../models/user');

router.post('/addUser', (req, res, next) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(user, (err, result) => {
        if(err){
            console.log(err);
        }
        res.json({
            success: true,
            "msg": "added successsfully"
        })
    })
})

module.exports = router;