var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();
const nodemailer = require('nodemailer');

/*
Add one new order
*/
addOneOrder = (params) => new Promise((resolve, reject) => {
    const {
        transaction_uuids, user_uuid,client_email
    } = params;

    // const email="raynasun0109@gmail.com"
    const clientEmailContent=`<h1>Thank you for your order!</h1><p>Dear customer,<br> We're currently processing your order and will send you a confirmation when your item(s) status has been changed. Please find a summary of your order below.</p>`;
    const smtpTransport = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: '1003811647@qq.com',
        pass: 'mdyzixegdprubeae'
      }})
    // console.log(params)
    const sql ='INSERT INTO `MY-Express-database`.orders (uuid,transaction_uuids, user_uuid,created_at,update_at,client_email) VALUES ('+ `'${uuid}','${transaction_uuids}','${user_uuid}','${currentTime}','${currentTime}','${client_email}')`;
    connection.query(sql, function (error, results, fields) {
        console.log(error)
        if (error){
            reject(error);
        }else{
            smtpTransport.sendMail({
                from: '1003811647@qq.com',
                to: client_email,
                subject: 'MY Shopaholic - Thank you for your order',
                html: clientEmailContent
        
              }, function (error, response) {
                if (error) {
                  console.log(error);
                  return error
                }
                console.log('Sent successfully')
                return "success"
              });
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
Get all orders from one user based on uuid
*/
getOrdersFromOneUser = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;

    const sql='SELECT * FROM `MY-Express-database`.orders WHERE user_uuid ='+`'${uuid}' ORDER BY created_at DESC;`
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully retrive the order data",
                data:[...results]
            }
            resolve(payload)
        }
    });
});

module.exports = {
    addOneOrder,getOrdersFromOneUser
}