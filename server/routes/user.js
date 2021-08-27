var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET user */
router.get('/:access_code', function(req, res) {
    console.log("Getting user!");
    database.query(`select * from guests where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send({
                access_code: results[0].access_code,
                email: results[0].email,
                username: results[0].username
            });
        }
    });
});

/* Update user email */
router.post('/:access_code', function(req, res) {
    console.log(req.body);
    database.query(`update guests set email = "${req.body.email}" where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
    });
});

module.exports = router;
