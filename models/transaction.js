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
Get one transcation from one order based on uuid and status
*/
getTranscationFromSameOrder = (params) => new Promise((resolve, reject) => {
    const {uuid,status}=params;

    const checkStatus=status?`= '${status}'`:"IS NOT NULL";
    const sql='SELECT * FROM `MY-Express-database`.transaction WHERE user_uuid ='+`'${uuid}' AND status ${checkStatus} ORDER BY created_at DESC;`
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
Get transcations from same merchant based on merchant_uuid and status
*/
getTranscationFromSameMerchant = (params) => new Promise((resolve, reject) => {
    const {merchant_uuid,status}=params;
    const checkStatus=status?`= '${status}'`:"IS NOT NULL";
    const sql='SELECT transaction.uuid AS transaction_uuid,transaction.update_at AS update_at, transaction.product_content AS product_content,transaction.order_uuid AS order_uuid,transaction.status AS status,transaction.created_at AS created_at,transaction.merchant_uuid AS merchant_uuid, user.first_name AS user_first_name,user.last_name AS user_last_name FROM `MY-Express-database`.transaction INNER JOIN `MY-Express-database`.user '+`ON transaction.user_uuid=user.uuid WHERE merchant_uuid = '${merchant_uuid}' AND status ${checkStatus} ORDER BY created_at DESC;`

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
Update one transaction
*/
updateOneTransaction = (params) => new Promise((resolve, reject) => {
    const {
        uuid, status
    } = params;
    const sql ='UPDATE `MY-Express-database`.transaction SET status='+ `"${status}", update_at = ${currentTime} WHERE uuid="${uuid}"`;
    connection.query(sql, function (error, results, fields) {
        // console.log(error)
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Updated Successfully",
                data:results
            }
            resolve(payload);
        }
    })
});

module.exports = {
    addOneTransaction,getOneTranscationFromOneOrder,getTranscationFromSameOrder,
    getTranscationFromSameMerchant,updateOneTransaction
}