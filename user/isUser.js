// 邮箱是否存在了
function isUser(db,email,cb){
    db.query(`SELECT * FROM user_info WHERE email='${email}'`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错'
            })
        }else{
            if(data.length==0){
                cb({
                    error: false,
                    data: '该邮箱还没注册过'
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
module.exports= isUser;