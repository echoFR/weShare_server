const mysql =require('mysql');
const db= mysql.createPool({
    host: '****',  
    user: 'root',
    password: '****',
    database: 'weshare',
	multipleStatements: true		//设置属性为true 允许执行多条sql
})
module.exports= db;