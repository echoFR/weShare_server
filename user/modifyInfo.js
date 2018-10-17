function getFans_list(db,id,type,newValue,cb){
    db.query(`update user_info set ${type}='${newValue}' where user_id=${id};`,(err,data)=>{
        if(err){
            console.log(err);
            cb({
                error: true,
                data: '数据库出错，修改失败'
            })
        }else{
            cb({
                error: false,
                data: '修改成功'
            })
        }
    })
}

module.exports= getFans_list;