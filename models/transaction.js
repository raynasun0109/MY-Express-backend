var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();

/*
Add one new transaction
*/
addOneTransaction = (params) => new Promise((resolve, reject) => {
    const {
        uuid, merchant_uuid,order_uuid,product_content,status,user_uuid
    } = params;
    
    const sql ='INSERT INTO `MY-Express-database`.transaction (uuid,merchant_uuid,order_uuid,product_content,status,user_uuid,created_at,update_at) VALUES ('+ `'${uuid}','${merchant_uuid}','${order_uuid}','${product_content}','${status}','${user_uuid}',${currentTime},${currentTime})`;
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
Get one transcation from one order based on uuid
*/
getOneTranscationFromOneOrder = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;
    // console.log(params)
    const sql='SELECT * FROM `MY-Express-database`.transaction WHERE uuid ='+`'${uuid}' ORDER BY created_at DESC;`
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully retrive the Transcation data",
                data:[...results]
            }
            resolve(payload)
        }
    });
});

/*
Get one transcation from one order based on uuid
*/
getTranscationFromSameOrder = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;
    const sql='SELECT * FROM `MY-Express-database`.transaction WHERE user_uuid ='+`'${uuid}' ORDER BY created_at DESC;`
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully retrive the Transcation data",
                data:[...results]
            }
            resolve(payload)
        }
    });
});

module.exports = {
    addOneTransaction,getOneTranscationFromOneOrder,getTranscationFromSameOrder
}