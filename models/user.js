var connection=require('./../config/mysql');
const { v4: uuidv4} = require('uuid');
var moment = require('moment');
const currentTime= JSON.stringify(moment().valueOf());
const uuid=uuidv4();
/*
Retriving all the user data
*/
getAllUser = () => new Promise((resolve, reject) => {
    connection.query('SELECT * FROM `MY-Express-database`.user;', function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            resolve(results);
        }
    });
});

/*
Retriving one user data
*/
getOneUser = (params) => new Promise((resolve, reject) => {
    const sql='SELECT * FROM `MY-Express-database`.user WHERE uuid ='+ `'${params.uuid}'`; 
    connection.query(sql, function (error, results, fields) {
        console.log(results,params)
        if (error){
            reject(error);
        }else{
            resolve(results);
        }
    });
});

/*
 user login
*/
userLogin = (params) => new Promise((resolve, reject) => {
    const {
        password,email
    } = params;
    const sql='SELECT * FROM `MY-Express-database`.user WHERE email ='+ `'${email}' AND password= '${password}'`;

    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            if (results[0]){
                const payload={
                    code:1,
                    msg:"Login Successfully",
                    data:results
                }
                resolve(payload);
            } else{
                const payload={
                    code:0,
                    msg:"Login Failed",
                    data:[...results]
                } 
                resolve(payload);
            }
            
        }
    });
});

/*
Update one user
*/
updateOneUser = (params) => new Promise((resolve, reject) => {
    const {
        first_name,password,email,last_name,type,shopping_cart,uuid
    } = params;
    const sql="UPDATE `MY-Express-database`.user SET email = "+`"${email}",password = "${password}",type="${type}",last_name="${last_name}",shopping_cart='${shopping_cart}',first_name="${first_name}", update_at="${currentTime}" WHERE uuid="${uuid}"`;
    // console.log(shopping_cart)
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            if (results){
                const payload={
                    code:1,
                    msg:"Update Successfully",
                    data:params
                }
                resolve(payload);
            } else{
                const payload={
                    code:0,
                    msg:"Update Failed",
                    data:[...results]
                } 
                resolve(payload);
            }
            
        }
    });
});

/*
Resigter one user
*/
registerOneUser = (params) => new Promise((resolve, reject) => {
    const {
        first_name, last_name,password,email,type
    } = params;
    
    const sql_to_check_existed_user='SELECT * from `MY-Express-database`.user WHERE email='+`'${email}'`;
    const sql_to_register_user='INSERT INTO `MY-Express-database`.user (uuid, first_name, last_name, email, password, type,created_at,update_at,shopping_cart) VALUES ('+ `'${uuid}','${first_name}','${last_name}', '${email}', '${password}', '${type}','${currentTime}','${currentTime}','[]' )`;

    connection.query(sql_to_check_existed_user, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const data={
                first_name, last_name,password,email,type,uuid,shopping_cart:'[]',created_at:currentTime,update_at:currentTime
            }
            if (!results[0]){
                connection.query(sql_to_register_user, function (error1, results1, fields1) {
                    console.log(error,error1)
                    if (error1){
                        reject(error1);
                    }else{
                        const payload={
                            code:1,
                            msg:"Register Successfully",
                            data:[data]
                        }
                        resolve(payload);
                    }
                    }
                );
            } else{
                const payload={
                    code:0,
                    msg:"Email already used",
                    data:params
                    }
                resolve(payload);
            }
        }
    });
});

/*
Retriving shopping cart by uuid
*/
updateShoppingCart = (params) => new Promise((resolve, reject) => {
    const {uuid,shopping_cart}=params;
    const sql="UPDATE `MY-Express-database`.user SET shopping_cart = "+`'${shopping_cart}',update_at="${currentTime}" WHERE uuid="${uuid}"`;
    // console.log(params.uuid)
    // console.log(params.shopping_cart)
// console.log(params)
    connection.query(sql, function (error, results, fields) {
        // console.log(error)

        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully retrieve shopping cart",
                data:[results]
            }
            resolve(payload)
        }
    });
});

/*
Update shopping cart by uuid
*/
fetchShoppingCart = (params) => new Promise((resolve, reject) => {
    const {uuid}=params;
    const sql='SELECT * FROM `MY-Express-database`.user WHERE uuid='+` '${uuid}';`
    
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            const payload={
                code:1,
                msg:"Successfully update shopping cart",
                data:[...results]
            }
            resolve(payload)
        }
    });
});

module.exports = {
    getAllUser,getOneUser,registerOneUser,userLogin,updateOneUser,fetchShoppingCart,updateShoppingCart
}