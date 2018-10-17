function getRelation(db,user_id,other_id,cb){
    db.query(`SELECT * FROM user_relation WHERE user_id=${user_id} and follow_id=${other_id}`,(err,data)=>{
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

module.exports= getRelation;