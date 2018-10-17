const moment= require('moment');
function insertFollow(db,user_id,follow_id,cb){
    const now= moment().format("YYYY-MM-DD HH:mm:ss");
    const addFans=`update user_info set fans_num=fans_num+1 where user_id=${follow_id};`;
    const addFollow= `update user_info set follow_num=follow_num+1 where user_id=${user_id};`;
    const follow= `INSERT INTO user_relation (user_id,follow_id,follow_time) VALUES (${user_id},${follow_id},'${now}');`;
    const sql= addFans+ addFollow+ follow;
    // 添加关注
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