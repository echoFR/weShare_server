function getMoving(db,user_id,cb){
    console.log(user_id);
    cb('获取动态列表')
    // db.query(`SELECT * FROM moving_info WHERE user_id=${user_id} ORDER BY moving_id DESC`,(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         cb({
    //             error: true,
    //             data: '数据库出错'
    //         })
    //     }else{
    //         cb({
    //             error: false,
    //             data: data
    //         })
    //     }
    // })
}

module.exports= getMoving;