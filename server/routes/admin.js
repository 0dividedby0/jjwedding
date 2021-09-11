var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET admin */
router.get('/:access_code', function (req, res) {
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
