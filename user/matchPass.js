function matchPass(db,email,pass,cb){
    db.query(`SELECT * FROM user_info WHERE email= '${email}'`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错'
            })
        }else{
            if(data[0].password === pass){
                cb({
                    error: false,
                    //登录的时候用
                    data: data[0]
                })
            }else{
                cb({
                    error: true,
                    data: '密码不正确'
                })
            }
        }
    })
}

module.exports= matchPass;