const moment= require('moment');
function insertFollow(db,user_id,group_id,cb){
    const now= moment().format("YYYY-MM-DD HH:mm:ss");
    const addFans=`update group_info set fans_num=fans_num+1 where group_id=${group_id};`;
    const follow= `INSERT INTO user_group (user_id,group_id,follow_time) VALUES (${user_id},${group_id},'${now}')`;
    const sql= addFans+ follow;
    db.query(sql,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错'
            })
            }else{
                cb({
                    error: false,
                    data: '成功添加关注'
                })
            }
    })
}

module.exports= insertFollow;