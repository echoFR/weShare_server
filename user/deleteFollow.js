function deleteFollow(db,user_id,follow_id,cb){
    const deleteFans=`update user_info set fans_num=fans_num-1 where user_id=${follow_id};`;
    const deleteFollow= `update user_info set follow_num=follow_num-1 where user_id=${user_id};`;
    const unfollow= `DELETE FROM user_relation WHERE user_id = ${user_id} AND follow_id= ${follow_id};`;
    const sql= deleteFans+ deleteFollow+ unfollow;
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

module.exports= deleteFollow;