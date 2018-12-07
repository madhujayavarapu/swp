const express = require("express");
const router  = express.Router();
const request = require('request');

router.get('/getCountriesUnderIND', (req, res, next) => {
    var Request = require("request");

    Request.get("http://services.groupkt.com/state/get/IND/all", (error, response, body) => {
        if(error) {
            return res.json({success:false,"msg":"something went wrong"});
        }
        return res.json(body);
    });
})

module.exports = router;