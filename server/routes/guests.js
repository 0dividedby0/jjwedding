var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET guests */
router.get('/:party_access_code', function(req, res) {
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
router.post('/', function(req, res) {
    console.log("Updating guests!")
    req.body.forEach(guest => {
        console.log(`\tUpdating guest ${guest.guest_id} - Name: ${guest.name}, RSVP: ${guest.rsvp}, Shower_RSVP: ${guest.shower_rsvp}`);
        database.query(`update guests set rsvp = ${guest.rsvp}, name = "${guest.name}", shower_rsvp = "${guest.shower_rsvp}" where guest_id = "${guest.guest_id}"`, function (error, results, fields) {
            if (error) console.log(error);
            else console.log("\tDone.");
        });
    });
    res.send({res: "Posted guests"});
});

module.exports = router;
