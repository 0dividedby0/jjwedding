var express = require('express');
var database = require('../database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
    database.query(`select * from guests where access_code = "BY3D"`, function (error, results, fields) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Success!");
            console.log(results);
            console.log(fields);
        }
    });
});

module.exports = router;
