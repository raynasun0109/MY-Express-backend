var connection=require('./../config/mysql');

/*
Retriving all the product data
*/
getAllProducts = () => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `MY-Express-database`.product;', function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            resolve(results);
        }
    });
});

module.exports = {
    getAllProducts
}