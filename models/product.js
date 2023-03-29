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
// /*
// Retriving the latest product data with limited number 
// */
// getLatestProducts = (params) => new Promise((resolve, reject) => {
//     const sql='SELECT * FROM `MY-Express-database`.product ORDER BY created_at DESC LIMIT'+` ${params.number};` 
//     connection.query(sql, function (error, results, fields) {
//         if (error){
//             reject(error);
//         }else{
//             const payload={
//                 code:1,
//                 msg:"Successfully retrive the latest data",
//                 data:[...results]
//             }
//             resolve(payload)
//         }
//     });
// });
/*
Retriving the latest product data with limited number and conditions
*/
getLatestProducts = (params) => new Promise((resolve, reject) => {
    const {number,category}=params;
    category_check = category?`= '${category}'`:"is not null";
    const sql='SELECT * FROM `MY-Express-database`.product WHERE category '+`${category_check} ORDER BY created_at DESC LIMIT ${number};` 
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

/*
Retriving one product by uuid
*/
getOneProduct = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;
    const sql='SELECT * FROM `MY-Express-database`.product WHERE uuid='+` '${uuid}';` 
    
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
    getAllProducts,getLatestProducts,getOneProduct
}