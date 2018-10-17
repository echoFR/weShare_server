function getInfo_id(db,id,cb){
    db.query(`SELECT * FROM user_info WHERE user_id= '${id}'`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错'
            })
        }else{
            cb({
                error: false,
                data: {
                    info:{
                        user_id: data[0].user_id,
                        username: data[0].username,
                        avatar: data[0].avatar,
                        fans_num: data[0].fans_num,
                        follow_num: data[0].follow_num,
                        moving_num: data[0].moving_num,
                        signature: data[0].signature,
                        regist_time: data[0].regist_time,
                        email: data[0].email,
                    }
                }
            })
        }
    })
}

module.exports= getInfo_id;