var connection=require('./../config/mysql');

/*
Retriving all the user data
*/
getAllUser = () => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `MY-Express-database`.user;', function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            resolve(results);
        }
    });
});

module.exports = {
    getAllUser
}