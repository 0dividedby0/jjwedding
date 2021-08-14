var mysql = require('mysql');

var database = mysql.createConnection({
    host     : 'localhost',
    user     : 'jjClient',
    password : 'jjClientDBPassword',
    database : 'wedding_guests'
});
  
database.connect(function(err){
    if(!err) {
        console.log("Database is connected ... \n\n");  
    } else {
        console.log(`Error connecting database ... \n\n${err}`);  
    }
});
  
database.query(`update guests set email = "jasonth14@gmail.com" where access_code = "BY3D"`, function (error, results, fields){
    if (error) {
        console.log(error);
    }
    else {
        console.log("Success!");
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
    }
});

module.exports = database