var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();
/*
Retriving all the product data
*/
getAllProducts = (params) => new Promise((resolve, reject) => {
    const {
        name,description,location,category,sortBy,priceFrom,priceTo,sortByKey,sortByItem
    } = params;
    category_check = category?`= '${category}'`:"is not null";
    name_check = name?`LIKE '%${name}%'`:"is not null";
    description_check = description?`LIKE '%${description}%'`:"is not null";
    location_check = location?`LIKE '%${location}%'`:"is not null";
    sortByKey_check=sortByKey?sortByKey:"DESC";
    sortByItem_check=sortByItem?sortByItem:"created_at";
    price_check = typeof priceFrom =="number" ?`< ${priceTo} AND price > ${priceFrom}`: "is not null"

    const sql= 'SELECT * FROM `MY-Express-database`.product WHERE name '+`${name_check} AND category ${category_check} AND description ${description_check} AND location ${location_check} AND price ${price_check} ORDER BY ${sortByKey_check} ${sortByItem_check};`;
    connection.query(sql, function (error, results, fields) {
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
    number_check = number?`= '${number}'`:"1000000000000";

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
    getProductsFromMerchant,deleteOneProduct,fetchShoppingCart
}