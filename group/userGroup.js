// 用户和圈子的关系
function userGroup(db,user_id,group_id,cb){
    db.query(`SELECT * FROM user_group WHERE user_id=${user_id} and group_id=${group_id}`,(err,data)=>{
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

module.exports= userGroup;