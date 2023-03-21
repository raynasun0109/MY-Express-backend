var mysql = require('mysql');

//configuration
// if(env=="development"){
  var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"123456",
    port: '3306'
  });
// }else{
//     var connection = mysql.createConnection({
//         host: process.env.RDS_HOSTNAME,
//         user: process.env.RDS_USERNAME,
//         password: process.env.RDS_PASSWORD,
//         port: process.env.RDS_PORT
//     });
// }
var env = process.env.NODE_ENV || 'development';

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

module.exports = connection;


