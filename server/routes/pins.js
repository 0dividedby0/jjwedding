var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET comments */
router.get('/', function(req, res) {
    console.log(`Getting pins!`);
    database.query(`select * from coordinates`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tReturned ${results.length} pins!`);
            res.send(results);
        }
    });
});
/* POST pins */
router.post('/', function(req, res) {
    console.log(`Adding pin - Access Code: ${req.body.access_code}, Zip: ${req.body.zip}, Lat: ${req.body.lat}, Lng: ${req.body.lng}`);
    database.query(`replace into coordinates (access_code, zip, lat, lng) values ("${req.body.access_code}", "${req.body.zip}", ${req.body.lat}, ${req.body.lng})`, function (error, results, fields) {
        if (error) console.log(error);
        else console.log("\tDone.");
    });
    res.send({res: "Posted pin"});
});

module.exports = router;