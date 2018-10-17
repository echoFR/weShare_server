function getFollow_list(db,id,cb){
    db.query(`SELECT * FROM user_relation WHERE user_id=${id} ORDER BY follow_time DESC`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错'
            })
        }else{
            cb({
                error: false,
                data: data
            })
        }
    })
}

module.exports= getFollow_list;