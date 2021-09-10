var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET comments */
router.get('/', function(req, res) {
    console.log(`Getting comments!`);
    database.query(`select * from comments`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tReturned ${results.length} comments!`);
            res.send(results);
        }
    });
});
/* Delete comment */
router.get('/delete/:id', function(req, res) {
    console.log(`Deleting comment ${req.params.id}!`);
    database.query(`delete from comments where id=${req.params.id}`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tDeleted!`);
            res.send(results);
        }
    });
});
/* POST comments */
router.post('/', function(req, res) {
    console.log(`Adding comment - Author: ${req.body.author}, Message: ${req.body.message}, System: ${req.body.system_message}, Time: ${req.body.time}`);
    database.query(`insert into comments (author, message, time, system_message) values ("${req.body.author}", "${req.body.message}", "${req.body.time}", ${req.body.system_message ? 1 : 0})`, function (error, results, fields) {
        if (error) console.log(error);
        else console.log("\tDone.");
    });
    res.send({res: "Posted comment"});
});

module.exports = router;