var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET party */
router.get('/party/:access_code', function(req, res) {
    console.log("Getting party!");
    database.query(`select * from parties where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            res.send({
                access_code: results[0].access_code,
                email: results[0].email,
                party: results[0].party
            });
        }
    });
});
/* POST party email */
router.post('/party/:access_code', function(req, res) {
    console.log(req.body);
    database.query(`update parties set email = "${req.body.email}" where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
    });
});
/* GET guests */
router.get('/guests/:party_access_code', function(req, res) {
    console.log("Getting guests!");
    database.query(`select * from guests where access_code = "${req.params.party_access_code}"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(results);
            res.send(results);
        }
    });
});
/* POST party email */
router.post('/guests', function(req, res) {
    console.log(req.body);
    req.body.forEach(guest => {
        database.query(`update guests set rsvp = ${guest.rsvp} where name = "${guest.name}"`, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
        });
    });
});

module.exports = router;
