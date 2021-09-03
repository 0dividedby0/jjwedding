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
                party: results[0].party,
                responded: results[0].responded
            });
        }
    });
});
/* POST party email */
router.post('/party/:access_code', function(req, res) {
    console.log(req.body);
    if ("email" in req.body){
        database.query(`update parties set email = "${req.body.email}" where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                res.send(results);
            }
        });
    }
    if ("responded" in req.body){
        database.query(`update parties set responded = ${req.body.responded} where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(results);
                res.send(results);
            }
        });
    }
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
/* POST guests */
router.post('/guests', function(req, res) {
    console.log(req.body);
    var success = true;
    req.body.forEach(guest => {
        database.query(`update guests set rsvp = ${guest.rsvp}, name = "${guest.name}" where guest_id = "${guest.guest_id}"`, function (error, results, fields) {
            if (error) {
                console.log(error);
                success = false;
            }
            else {
                console.log(results);
            }
        });
    });
    res.send(success ? "Success" : "Failed to post guests");
});

module.exports = router;
