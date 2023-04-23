var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const nodemailer = require('nodemailer');

/*
Add one new transaction
*/
addOneTransaction = (params) => new Promise((resolve, reject) => {
    const {
        uuid, merchant_uuid,order_uuid,product_content,status,user_uuid,total,
        address,client_email
    } = params;
    // console.log(client_email)
    const sql ='INSERT INTO `MY-Express-database`.transaction (uuid,merchant_uuid,order_uuid,product_content,status,user_uuid,created_at,update_at,total,address,client_email) VALUES ('+ `'${uuid}','${merchant_uuid}','${order_uuid}','${product_content}','${status}','${user_uuid}','${currentTime}','${currentTime}',${total},'${address}','${client_email}')`;
    connection.query(sql, function (error, results, fields) {
        // console.log(error)
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
    // console.log(status)
    const sql='SELECT transaction.client_email AS client_email, transaction.address AS address, transaction.total AS total, transaction.uuid AS transaction_uuid,transaction.update_at AS update_at, transaction.product_content AS product_content,transaction.order_uuid AS order_uuid,transaction.status AS status,transaction.created_at AS created_at,transaction.merchant_uuid AS merchant_uuid, user.first_name AS user_first_name,user.last_name AS user_last_name FROM `MY-Express-database`.transaction INNER JOIN `MY-Express-database`.user '+`ON transaction.user_uuid=user.uuid WHERE merchant_uuid = '${merchant_uuid}' AND status ${checkStatus} ORDER BY created_at DESC;`

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
        uuid, status,client_email
    } = params;
    // const email="raynasun0109@gmail.com"
    let clientEmailContent="";
    if(status=="Processing"){
        clientEmailContent=`<h1>Thank you for your order!</h1><p>Dear customer,<br> Your order ${uuid} has been confirmed and processed in the warehouse now!</p>`;
    } else if (status=="Shipped"){
        clientEmailContent=`<h1>Thank you for your order!</h1><p>Dear customer,<br> Your order ${uuid} has been dispatched!</p>`;
    }

    const smtpTransport = nodemailer.createTransport({
      service: 'QQ',
      auth: {
        user: '1003811647@qq.com',
        pass: 'mdyzixegdprubeae'
      }})
    const sql ='UPDATE `MY-Express-database`.transaction SET status='+ `"${status}", update_at = ${currentTime} WHERE uuid="${uuid}"`;
    connection.query(sql, function (error, results, fields) {
        // console.log(error)
        if (error){
            reject(error);
        }else{
            smtpTransport.sendMail({
                from: '1003811647@qq.com',
                to: client_email,
                subject: 'MY Shopaholic - Order Updates',
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
                msg:"Updated Successfully",
                data:results
            }
            resolve(payload);
        }
    })
});

/*
Get total amount and list of transcations based on different conditions
*/
getTotalFromTranscation = (params) => new Promise((resolve, reject) => {
    const {merchant_uuid,status,start_time,end_time}=params;
    const checkStatus=status?`= '${status}'`:"IS NOT NULL";
    const checkEndTime=end_time?`${end_time}`:"10000000000000";
    const checkStartTime=start_time?`${start_time}`:"0";

    const sql='SELECT transaction.address AS address, transaction.total AS total, transaction.uuid AS transaction_uuid,transaction.update_at AS update_at, transaction.product_content AS product_content,transaction.order_uuid AS order_uuid,transaction.status AS status,transaction.created_at AS created_at,transaction.merchant_uuid AS merchant_uuid, user.first_name AS user_first_name,user.last_name AS user_last_name FROM `MY-Express-database`.transaction INNER JOIN `MY-Express-database`.user '+`ON transaction.user_uuid=user.uuid WHERE merchant_uuid = '${merchant_uuid}' AND status ${checkStatus} AND transaction.created_at < ${checkEndTime} AND transaction.created_at > ${checkStartTime} ORDER BY transaction.created_at DESC;`
    connection.query(sql, function (error, results, fields) {

        if (error){
            reject(error);
        }else{
            let totalAmount=0;
            for (let i =0;i<results.length;i++){
                totalAmount+=Number(results[i].total)
            }
            const payload={
                code:1,
                msg:"Successfully retrive the Transcation data",
                data:{
                    total:totalAmount,
                    data:[...results]
                }
            }
            resolve(payload)
        }
    });
});

/*
Get daily total amount and list of transcations based on different conditions
*/
getDailyTotalFromTranscation = (params) => new Promise((resolve, reject) => {
    const {merchant_uuid,status,start_time,end_time}=params;
    const checkStatus=status?`= '${status}'`:"IS NOT NULL";
    const checkEndTime=end_time?`${end_time}`:"10000000000000";
    const checkStartTime=start_time?`${start_time}`:"0";

    const sql='SELECT transaction.address AS address,transaction.total AS total, transaction.uuid AS transaction_uuid,transaction.update_at AS update_at, transaction.product_content AS product_content,transaction.order_uuid AS order_uuid,transaction.status AS status,transaction.created_at AS created_at,transaction.merchant_uuid AS merchant_uuid, user.first_name AS user_first_name,user.last_name AS user_last_name FROM `MY-Express-database`.transaction INNER JOIN `MY-Express-database`.user '+`ON transaction.user_uuid=user.uuid WHERE merchant_uuid = '${merchant_uuid}' AND status ${checkStatus} AND transaction.created_at < ${checkEndTime} AND transaction.created_at > ${checkStartTime} ORDER BY transaction.created_at DESC;`

    function calculateWeekDate(basisDate = moment().format('YYYY-MM-DD')) {
        let weekDate = [];
        let howWeek = moment(basisDate).day();
        // if today is Sunday, calculate 6 more days
        if (howWeek === 0) {
          let mixins = 0;
          while (mixins <= 6) {
            weekDate.unshift(moment(basisDate).subtract(mixins, 'days').format('YYYY-MM-DD'));
            mixins++;
          }
          return weekDate;
        }
     
        let minusNum = 1, addNum = 1;
        while (minusNum <= howWeek) {
          weekDate.push({data:[],number:0,date:moment(basisDate).subtract(howWeek - minusNum, 'days').format('YYYY-MM-DD')});
          minusNum++;
        }
     
        while(addNum <= (7 - howWeek)) {
          weekDate.push({data:[],number:0,date:moment(basisDate).add(addNum, 'days').format('YYYY-MM-DD')});
          addNum++;
        }
        return weekDate;
    }

    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            let number=0;
            let list =calculateWeekDate();

            for (let i =0;i<results.length;i++){
                for (let j=0;j<list.length;j++){
                    if(list[j].date==moment(JSON.parse(results[i].created_at)).format('YYYY-MM-DD')){
                        list[j].data.push(results[i]);
                        list[j].number++;
                        number++;
                    }
                }
            }
            const payload={
                code:1,
                msg:"Successfully retrive the Transcation data",
                data:{list,number}
            }
            resolve(payload)
        }
    });
});


/*
Get weekly transcations based on different conditions
*/
getWeeklyTranscation = (params) => new Promise((resolve, reject) => {
    const {merchant_uuid,status,start_time,end_time}=params;
    const checkStatus=status?`= '${status}'`:"IS NOT NULL";
    const checkEndTime=end_time?`${end_time}`:"10000000000000";
    const checkStartTime=start_time?`${start_time}`:"0";

    const sql='SELECT transaction.address AS address, transaction.total AS total, transaction.uuid AS transaction_uuid,transaction.update_at AS update_at, transaction.product_content AS product_content,transaction.order_uuid AS order_uuid,transaction.status AS status,transaction.created_at AS created_at,transaction.merchant_uuid AS merchant_uuid, user.first_name AS user_first_name,user.last_name AS user_last_name FROM `MY-Express-database`.transaction INNER JOIN `MY-Express-database`.user '+`ON transaction.user_uuid=user.uuid WHERE merchant_uuid = '${merchant_uuid}' AND status ${checkStatus} AND transaction.created_at < ${checkEndTime} AND transaction.created_at > ${checkStartTime} ORDER BY transaction.created_at DESC;`

    function calculateWeekDate(basisDate = moment().format('YYYY-MM-DD')) {
        let weekDate = [];
        let howWeek = moment(basisDate).day();
        // if today is Sunday, calculate 6 more days
        if (howWeek === 0) {
          let mixins = 0;
          while (mixins <= 6) {
            weekDate.unshift(moment(basisDate).subtract(mixins, 'days').format('YYYY-MM-DD'));
            mixins++;
          }
          return weekDate;
        }
     
        let minusNum = 1, addNum = 1;
        while (minusNum <= howWeek) {
          weekDate.push({data:[],Shipped:0,Processing:0,Paid:0,date:moment(basisDate).subtract(howWeek - minusNum, 'days').format('YYYY-MM-DD')});
          minusNum++;
        }
     
        while(addNum <= (7 - howWeek)) {
          weekDate.push({data:[],Shipped:0,Processing:0,Paid:0,date:moment(basisDate).add(addNum, 'days').format('YYYY-MM-DD')});
          addNum++;
        }
        return weekDate;
    }

    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            let list =calculateWeekDate();
            let number=0;
            for (let i =0;i<results.length;i++){
                for (let j=0;j<list.length;j++){
                    if(list[j].date==moment(JSON.parse(results[i].created_at)).format('YYYY-MM-DD')){
                        list[j].data.push(results[i]);
                        list[j][results[i].status]++;
                        number++;
                    }
                }
            }
            const payload={
                code:1,
                msg:"Successfully retrive the Transcation data",
                data:{list,number}
            }
            resolve(payload)
        }
    });
});

module.exports = {
    addOneTransaction,getOneTranscationFromOneOrder,getTranscationFromSameOrder,
    getTranscationFromSameMerchant,updateOneTransaction,getTotalFromTranscation,
    getDailyTotalFromTranscation,getWeeklyTranscation
}