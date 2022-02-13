var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET party */
router.get('/:access_code', function(req, res) {
    console.log(`Getting party ${req.params.access_code}!`);
    database.query(`select * from parties where access_code = "${req.params.access_code}"`, function (error, results, fields) {
        if (error) console.log(error);
        else {
            console.log(`\tResult: {${results[0].access_code}, ${results[0].email}, ${results[0].party}, ${results[0].responded}, ${results[0].shower_responded}, ${results[0].admin}, ${results[0].bridal_shower}}`);
            res.send({
                access_code: results[0].access_code,
                email: results[0].email,
                party: results[0].party,
                responded: results[0].responded,
                admin: results[0].admin,
                bridal_shower: results[0].bridal_shower,
                shower_responded: results[0].shower_responded
            });
        }
    });
});
/* POST party */
router.post('/:access_code', function(req, res) {
    console.log(`Updating party ${req.params.access_code}!`);
    if ("email" in req.body){
        console.log(`\tSetting email to ${req.body.email}`);
        database.query(`update parties set email = "${req.body.email}" where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) console.log(error);
            else res.send(results);
        });
    }
    else if ("shower_responded" in req.body){
        console.log(`\tSetting responded to ${req.body.shower_responded}`);
        database.query(`update parties set shower_responded = ${req.body.shower_responded} where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) console.log(error);
            else res.send(results);
        });
    }
    else if ("responded" in req.body){
        console.log(`\tSetting responded to ${req.body.responded}`);
        database.query(`update parties set responded = ${req.body.responded} where access_code = "${req.params.access_code}"`, function (error, results, fields) {
            if (error) console.log(error);
            else res.send(results);
        });
    }
});

module.exports = router;
