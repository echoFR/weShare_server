function deleteFollow_group(db,user_id,group_id,cb){
    const deleteFans=`update group_info set fans_num=fans_num-1 where group_id=${group_id};`;
    const unfollow= `DELETE FROM user_group WHERE user_id = ${user_id} AND group_id= ${group_id};`;
    const sql= deleteFans+ unfollow;
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
                data: '成功取消关注'
            })
        }
    })
}

module.exports= deleteFollow_group;