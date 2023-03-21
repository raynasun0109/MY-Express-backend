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

/*
Retriving the latest product data
*/
getLatestProducts = (params) => new Promise((resolve, reject) => {
    const sql='SELECT * FROM `MY-Express-database`.product ORDER BY created_at DESC LIMIT'+` ${params.number};` 
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully retrive the latest data",
                data:[...results]
            }
            resolve(payload)
        }
    });
});

module.exports = {
    getAllProducts,getLatestProducts
}