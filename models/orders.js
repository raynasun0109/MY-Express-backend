var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();

/*
Add one new order
*/
addOneOrder = (params) => new Promise((resolve, reject) => {
    const {
        transaction_uuids, user_uuid
    } = params;
    console.log(params)
    const sql ='INSERT INTO `MY-Express-database`.orders (uuid,transaction_uuids, user_uuid,created_at,update_at) VALUES ('+ `'${uuid}','${transaction_uuids}','${user_uuid}',${currentTime},${currentTime})`;
    connection.query(sql, function (error, results, fields) {
        console.log(error)

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

module.exports = {
    addOneOrder
}