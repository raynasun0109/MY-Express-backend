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
    const sql='SELECT * FROM `MY-Express-database`.user WHERE uuid ='+ `${params.uuid}`; 
    connection.query(sql, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            resolve(results);
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
    console.log(4444,params);
    const sql_to_check_existed_user='SELECT * from `MY-Express-database`.user WHERE email='+`'${email}'`;
    const sql_to_register_user='INSERT INTO `MY-Express-database`.user (uuid, first_name, last_name, email, password, type,created_at,update_at) VALUES ('+ `'${uuid}','${first_name}','${last_name}', '${email}', '${password}', ${type},${currentTime},${currentTime} )`;

    connection.query(sql_to_check_existed_user, function (error, results, fields) {
        if (error){
            reject(error);
        }else{
            if (!results[0]){
                connection.query(sql_to_register_user, function (error1, results1, fields1) {
                    if (error1){
                        reject(error1);
                    }else{
                        const payload={
                            code:1,
                            msg:"Register Successfully",
                            data:params
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

module.exports = {
    getAllUser,getOneUser,registerOneUser
}