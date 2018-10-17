const moment= require('moment');
const isUser= require('./isUser');
function addUser(db,email,pass,cb){
    const nowDate= moment().format("YYYY-MM-DD HH:mm:ss");//当前时间
    const name='小圈友_'
    isUser(db,email,(data)=>{
        if(!data.error){
            db.query(`INSERT INTO user_info(username,password,regist_time,email) VALUES ('${name}','${pass}','${nowDate}','${email}')`,(err,data)=>{
                if(err){
                    console.log(err);
                    cb({
                        error: true,
                        data: '数据库出错'
                    }) 
                }else{
                    cb({
                        error: false,
                        data: '注册成功'
                    })
                }
            })
        }else{
            if(data.data==='数据库出错'){
                cb({
                    error: true,
                    data: '数据库出错'
                })
            }else{
                cb({
                    error: true,
                    data: '该邮箱已经注册过了'
                })
            }
        }
    })
}
module.exports= addUser;