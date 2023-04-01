var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();
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

/*
Remove one product by uuid
*/
deleteOneProduct = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;
    const sql='DELETE FROM `MY-Express-database`.product WHERE uuid='+`'${uuid}';`
    
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully delete the product",
            }
            resolve(payload)
        }
    });
});

/*
Retriving products own by merchant
*/
getProductsFromMerchant = (params) => new Promise((resolve, reject) => {
    const {merchant_uuid}=params;
    const sql='SELECT * FROM `MY-Express-database`.product WHERE merchant_uuid='+` '${merchant_uuid}';`
    
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
Add one new product
*/
addOneProduct = (params) => new Promise((resolve, reject) => {
    const {
        merchant_uuid, name,price,description,location,category,image,stock
    } = params;
    
    const sql ='INSERT INTO `MY-Express-database`.product (uuid,merchant_uuid, name,price,description,location,category,image,stock,created_at,update_at) VALUES ('+ `'${uuid}','${merchant_uuid}','${name}', '${price}', '${description}', '${location}', '${category}', '${image}', '${stock}',${currentTime},${currentTime})`;
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Added Successfully",
                data:params
            }
            resolve(payload);
        }
    })
});

/*
Update one new product
*/
updateOneProduct = (params) => new Promise((resolve, reject) => {
    const {
        uuid, name,price,description,location,category,image,stock
    } = params;
    const sql ='UPDATE `MY-Express-database`.product SET name='+ `"${name}", price= '${price}', description='${description}', location='${location}', category='${category}', image='${image}', stock='${stock}', update_at = ${currentTime} WHERE uuid="${uuid}"`;
    connection.query(sql, function (error, results, fields) {
        console.log(error)

        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Updated Successfully",
                data:params
            }
            resolve(payload);
        }
    })

});

module.exports = {
    getAllProducts,getLatestProducts,getOneProduct,addOneProduct,updateOneProduct,
    getProductsFromMerchant,deleteOneProduct
}