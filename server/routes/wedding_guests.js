var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET party */
router.get('/party/:access_code', function(req, res) {
    console.log(`Getting party ${req.params.access_code}!`);
    database.query(`select * from parties where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tResult: {${results[0].access_code}, ${results[0].email}, ${results[0].party}, ${results[0].responded}, ${results[0].admin}}`);
            res.send({
                access_code: results[0].access_code,
                email: results[0].email,
                party: results[0].party,
                responded: results[0].responded,
                admin: results[0].admin
            });
        }
    });
});
/* POST party */
router.post('/party/:access_code', function(req, res) {
    console.log(`Updating party ${req.params.access_code}!`);
    if ("email" in req.body){
        console.log(`\tSetting email to ${req.body.email}`);
        database.query(`update parties set email = "${req.body.email}" where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) console.log(error);
            else res.send(results);
        });
    }
    if ("responded" in req.body){
        console.log(`\tSetting responded to ${req.body.responded}`);
        database.query(`update parties set responded = ${req.body.responded} where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) console.log(error);
            else res.send(results);
        });
    }
});
/* GET guests */
router.get('/guests/:party_access_code', function(req, res) {
    console.log(`Getting guests for ${req.params.party_access_code}!`);
    database.query(`select * from guests where access_code = "${req.params.party_access_code}"`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tReturned ${results.length} guests!`);
            res.send(results);
        }
    });
});
/* POST guests */
router.post('/guests', function(req, res) {
    console.log("Updating guests!")
    req.body.forEach(guest => {
        console.log(`\tUpdating guest ${guest.guest_id} - Name: ${guest.name}, RSVP: ${guest.rsvp}`);
        database.query(`update guests set rsvp = ${guest.rsvp}, name = "${guest.name}" where guest_id = "${guest.guest_id}"`, function (error, results, fields) {
            if (error) console.log(error);
            else console.log("\tDone.");
        });
    });
    res.send("Posted guests");
});
/* GET admin */
router.get('/admin/:access_code', function (req, res) {
    console.log("Getting admin data!");
    //Check if party is authenticated
    var returnObject = {parties: [], guests: []};
    database.query(`select admin from parties where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) console.log(error);
        else if (results[0].admin) {
            //Get all parties
            database.query(`select * from parties`, function (error, results, fields) {
                if (error) console.log(error);
                else {
                    returnObject.parties = results;
                    //Get all guests
                    database.query(`select * from guests`, function (error, results, fields) {
                        if (error) console.log(error);
                        else {
                            returnObject.guests = results;
                            //Return object
                            res.send(returnObject);
                        }
                    });
                }
            });
        }
        else {
            console.log("\tUnauthenticated.");
            res.send("Unauthenticated");
            return;
        }
    });
});

module.exports = router;
