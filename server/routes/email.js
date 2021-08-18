var express = require('express');
var database = require('../database');
var router = express.Router();

/* Update user email */
router.post('/', function(req, res) {
    console.log(req.body);
    database.query(`update guests set email = "${req.body.email}" where access_code = "${req.body.access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send(`Successfully updated email for ${req.body.access_code}`)
        }
    });
});

module.exports = router;
